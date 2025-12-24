import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UploadVideoForm } from "./types/video";

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [resource, config] = args;

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const url = resource.toString().includes("https")
      ? resource
      : import.meta.env.VITE_API_BASE_URL + resource;

    const response = await originalFetch(url, {
      headers,
      credentials: "include",
      ...config,
    });

    // Response interception logic
    // Example: Global error handling
    if (!response.ok) {
      console.error("Fetch error:", response.status, response.statusText);
      // Handle specific error codes or redirect
    }

    // Important: if you need to read the response body in the interceptor
    // and still pass it down, you must clone the response.
    // const clonedResponse = response.clone();
    // const data = await clonedResponse.json();
    // console.log('Response data:', data);

    const clonedResponse = response.clone();
    if (response.headers.get("Content-Type") === "application/json") {
      const data = await response.json();
      console.log("Response data:", data);
    }
    return clonedResponse;
  } catch (error) {
    // Error interception logic
    console.error("Network or fetch error:", error);
    throw error; // Re-throw the error to propagate it
  }
};

export const queryClient = new QueryClient();

type SigninRequestData = {
  username: string;
  password: string;
};

export const useSignin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ username, password }: SigninRequestData) => {
      const response = await fetch("auth/signin", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Response status: " + response.status);
      }
      return await response.json();
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

type SignupRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const useSignup = () =>
  useMutation({
    mutationFn: async (data: SignupRequestData) => {
      const response = await fetch("auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Response status: " + response.status);
      }
      return await response.json();
    },
  });

export const useAuth = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("auth/me", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return await response.json();
    },
    retry: false,
  });

type StartMulipartUploadRequest = {
  videoFile: File;
};

type StartMulipartUploadResponse = {
  uploadId: string;
  videoId: string;
  urls: { url: string; partNumber: number }[];
};

export const useStartMulipartUpload = () => {
  const { mutateAsync: uploadPart } = useUploadPart();
  const { mutateAsync: completeUpload } = useCompleteMulipartUpload();
  const { mutateAsync: abortUpload } = useAbortMulipartUpload();

  return useMutation({
    mutationFn: async ({
      videoFile,
    }: StartMulipartUploadRequest): Promise<StartMulipartUploadResponse> => {
      const response = await fetch("upload/multipart/start", {
        method: "POST",
        body: JSON.stringify({
          contentType: videoFile.type,
          fileSize: videoFile.size,
        }),
      });
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return await response.json();
    },
    onSuccess: async (data, { videoFile }) => {
      const { urls, videoId, uploadId } = data;
      try {
        const bytes = await videoFile.arrayBuffer();
        const partSize = 20_000_000;

        const promises = urls.map(({ url, partNumber }, idx: number) =>
          uploadPart({
            url,
            body: bytes.slice(idx * partSize, idx * partSize + partSize),
            partNumber,
          })
        );

        const results = await Promise.all(promises);

        console.log({ results });

        const response = await completeUpload({
          contentType: videoFile.type,
          uploadId,
          videoId,
          parts: results,
        });

        console.log({ response });
      } catch (err) {
        abortUpload({ uploadId, videoId });
        console.log(err);
      }
    },
  });
};

type CompleteMulipartUploadRequest = {
  contentType: string;
  uploadId: string;
  videoId: string;
  parts: { PartNumber: number; ETag: string }[];
};

export const useCompleteMulipartUpload = () => {
  return useMutation({
    mutationFn: async (data: CompleteMulipartUploadRequest) => {
      const response = await fetch("upload/multipart/complete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return await response.json();
    },
  });
};

type UploadPartRequest = {
  url: string;
  body: ArrayBuffer | Uint8Array<ArrayBuffer>;
  partNumber: number;
};

export const useUploadPart = () =>
  useMutation({
    mutationFn: async ({ url, body, partNumber }: UploadPartRequest) => {
      const response = await fetch(url, {
        method: "PUT",
        body,
      });
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      const ETag = response.headers.get("Etag") as string;
      return { ETag, PartNumber: partNumber };
    },
    onSuccess: (data, variables) => {
      console.log(`Request to ${variables.url} was successful!`, data);
    },
  });

type AbortMulipartUploadRequest = {
  uploadId: string;
  videoId: string;
};

export const useAbortMulipartUpload = () => {
  return useMutation({
    mutationFn: async (data: AbortMulipartUploadRequest) => {
      const response = await fetch("upload/multipart/abort", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return await response.json();
    },
  });
};



export const useCreateVideo = () => {
  return useMutation({
    mutationFn: async (values: UploadVideoForm) => {
      const response = await fetch("videos/create", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("something gone wrong");
      }
      return await response.json();
    }
  });
}
