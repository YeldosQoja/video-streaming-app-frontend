import AuthLayout from "@/routes/public";
import SignIn from "@/routes/public/signin";
import SignUp from "@/routes/public/signup";
import MainLayout from "@/routes/private";
import Upload from "@/routes/private/upload";
import Video from "@/routes/private/video";
import Home from "@/routes/private/home";

export const routes = [
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
]