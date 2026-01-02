import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UploadVideoForm } from "./types/video";
import { MultipartUploadDTO, UploadPart, UploadURL } from "./types/upload";
import {
  abortMultipartUpload,
  completeMultipartUpload,
  startMultipartUpload,
  uploadPart,
} from "./api/upload";

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [resource, config] = args;

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await originalFetch(
      import.meta.env.VITE_API_BASE_URL + resource,
      {
        headers,
        credentials: "include",
        ...config,
      }
    );

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
    const data = await response.json();
    console.log("Response data:", data);
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

export const useUpload = () => {
  const { mutateAsync: startUpload } = useStartMulipartUpload();
  const { mutateAsync: uploadPart } = useUploadPart();
  const { mutateAsync: completeUpload } = useCompleteMulipartUpload();

  return useMutation({
    mutationFn: async (videoFile: File) => {
      const { urls, videoId, uploadId } = await startUpload(videoFile);
      const bytes = await videoFile.arrayBuffer();
      const partSize = 20_000_000;

      const uploadPromises = urls.map((url, idx: number) =>
        uploadPart({
          ...url,
          body: bytes.slice(idx * partSize, idx * partSize + partSize),
        })
      );

      const results = await Promise.all(uploadPromises);

      await completeUpload({
        uploadId,
        videoId,
        parts: results,
      });
    },
  });
};

export const useStartMulipartUpload = () =>
  useMutation({
    mutationFn: async (videoFile: File) => {
      const response = await startMultipartUpload(videoFile);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return (await response.json()) as MultipartUploadDTO & {
        urls: UploadURL[];
      };
    },
  });

export const useCompleteMulipartUpload = () => {
  return useMutation({
    mutationFn: async (data: MultipartUploadDTO & { parts: UploadPart[] }) => {
      const response = await completeMultipartUpload(data);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      return await response.json();
    },
  });
};

export const useUploadPart = () =>
  useMutation({
    mutationFn: async (
      data: UploadURL & { body: ArrayBuffer | Uint8Array<ArrayBuffer> }
    ) => {
      return await uploadPart(data);
    },
    onSuccess: (data, variables) => {
      console.log(`Request to ${variables.url} was successful!`, data);
    },
  });

export const useAbortMulipartUpload = () => {
  return useMutation({
    mutationFn: async (data: MultipartUploadDTO) => {
      const response = await abortMultipartUpload(data);
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
    },
  });
};
