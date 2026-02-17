import {
  QueryClient,
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MultipartUploadDTO, UploadURL } from "./types/upload";
import {
  completeMultipartUpload,
  simpleUploadFile,
  startMultipartUpload,
  startSimpleUpload,
  uploadPart,
} from "./api/upload";
import { useRetry } from "./hooks/useRetry";
import { useCallback, useRef, useState } from "react";

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

export const useMultipartUpload = (): [
  UseMutationResult<string, Error, File, unknown>,
  number
] => {
  const [progress, setProgress] = useState(0);
  const totalBytes = useRef(0);
  const uploadedBytes = useRef<number[] | null>(null);

  const onProgress = useCallback((partNumber: number, loaded: number) => {
    if (!uploadedBytes.current) return;
    uploadedBytes.current[partNumber - 1] = loaded;
    const totalUpload = uploadedBytes.current.reduce(
      (acc, cur) => acc + cur,
      0
    );
    setProgress(Math.floor((totalUpload / totalBytes.current) * 100));
  }, []);

  const uploadPartWithRetry = useRetry(uploadPart);
  const mutation = useMutation({
    mutationFn: async (videoFile: File) => {
      totalBytes.current = videoFile.size;

      const response = await startMultipartUpload(videoFile);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      const { urls, videoId, uploadId } =
        (await response.json()) as MultipartUploadDTO & {
          urls: UploadURL[];
        };

      const bytes = await videoFile.arrayBuffer();
      const partSize = 20_000_000;

      uploadedBytes.current = urls.map(() => 0);

      const uploadPromises = urls.map((url, idx: number) =>
        uploadPartWithRetry(
          {
            ...url,
            body: bytes.slice(idx * partSize, idx * partSize + partSize),
          },
          onProgress
        )
      );

      const results = await Promise.all(uploadPromises);

      await completeMultipartUpload({
        uploadId,
        videoId,
        parts: results,
      });

      return videoId;
    },
  });

  return [mutation, progress];
};

export const useSimpleUpload = (): [
  UseMutationResult<string, Error, File, unknown>,
  number
] => {
  const [progress, setProgress] = useState(0);

  const onProgress = useCallback((loaded: number, total: number) => {
    setProgress(Math.floor((loaded / total) * 100));
  }, []);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const response = await startSimpleUpload(file);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }
      const { url, key } = (await response.json()) as {
        url: string;
        key: string;
      };

      await simpleUploadFile(url, file, onProgress);

      return key;
    },
  });

  return [mutation, progress];
};

export const useCreateVideo = () => {
  return useMutation({
    mutationFn: async (values: object) => {
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

export const useGetVideoByKey = (key: string) =>
  useQuery({
    queryKey: ["videos", key],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`videos/${queryKey[1]}`);
      if (!response.ok) {
        throw new Error(`Couldn't get a video with key ${key}`);
      }
      return await response.json();
    },
  });
