import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/app";
import Auth from "./routes/auth";
import SignIn from "./routes/auth/signin";
import SignUp from "./routes/auth/signup";
import Upload from "./routes/app/upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "upload",
    element: <Upload />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
