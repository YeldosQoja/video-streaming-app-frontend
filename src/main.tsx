import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./routes/public/auth-layout";
import SignIn from "./routes/public/signin";
import SignUp from "./routes/public/signup";
import Upload from "./routes/private/upload";
import Video from "./routes/private/video";
import MainLayout from "./routes/private/main-layout";
import Home from "./routes/private/home";

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
        path: ":videoId",
        Component: Video,
      },
      {
        path: "upload",
        Component: Upload,
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
