import { Outlet, useLocation } from "react-router-dom";
import "./styles.css";
import { SidebarProvider, Sidebar } from "@/components/sidebar";
import { History, Home, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Drawer, DrawerProvider } from "@/components/drawer";

const HOME_SIDEBAR_ITEMS = [
  {
    key: "home",
    icon: <Home />,
    label: "Home",
  },
  {
    key: "trending",
    icon: <TrendingUp />,
    label: "Trending",
  },
  {
    key: "history",
    icon: <History />,
    label: "History",
  },
];

export default function MainLayout() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/watch/");
  // console.log({ location });

  return (
    <SidebarProvider>
      <DrawerProvider>
        <div className="main">
          {!hideLayout && <Sidebar items={HOME_SIDEBAR_ITEMS} />}
          <Header />
          <Drawer items={HOME_SIDEBAR_ITEMS} />
          <Outlet />
        </div>
      </DrawerProvider>
    </SidebarProvider>
  );
}
