import { Outlet, useLocation } from "react-router-dom";
import "./styles.css";
import { SidebarProvider, Sidebar, useSidebar } from "@/components/sidebar";
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

export const MainLayout = () => {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/watch/");

  return (
    <SidebarProvider>
      <DrawerProvider>
        <div className="main">
          {!hideLayout && <Sidebar items={HOME_SIDEBAR_ITEMS} />}
          <Header />
          <Drawer items={HOME_SIDEBAR_ITEMS} />
          <PageOutlet />
        </div>
      </DrawerProvider>
    </SidebarProvider>
  );
};

const PageOutlet = () => {
  const { open: sidebarOpen } = useSidebar();
  return (
    <div
      className="outlet"
      data-sidebar-state={sidebarOpen ? "expanded" : "collapsed"}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
