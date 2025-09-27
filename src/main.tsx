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
import ChannelLayout from "./routes/private/channel";
import Dashboard from "./routes/private/channel/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "watch/:videoId",
        Component: Video,
      },
    ],
  },
  {
    path: "channel/:channelId",
    Component: ChannelLayout,
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
    <RouterProvider router={router} />
  </StrictMode>
);
