import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

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

export const useSignin = () =>
  useMutation({
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
  });

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
