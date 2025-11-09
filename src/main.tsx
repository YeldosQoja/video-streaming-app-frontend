import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "@/routes/public/auth";
import SignIn from "@/routes/public/auth/signin";
import SignUp from "@/routes/public/auth/signup";
import MainLayout from "@/routes/private";
import Video from "@/routes/private/video";
import Home from "@/routes/private/home";
import ChannelLayout from "@/routes/private/channel";
import Dashboard from "@/routes/private/channel/dashboard";
import Search from "@/routes/private/search";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "watch/:videoId",
        Component: Video,
      },
      {
        path: "results",
        Component: Search,
      },
    ],
  },
  {
    path: "channel/:channelId",
    element: (
      <ProtectedRoute>
        <ChannelLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
