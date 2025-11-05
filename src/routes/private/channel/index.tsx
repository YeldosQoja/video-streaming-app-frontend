import "./styles.css";
import { Outlet } from "react-router-dom";
import {
  ChartNoAxesCombined,
  Clapperboard,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Sidebar, SidebarProvider } from "@/components/sidebar";

const CHANNEL_SIDEBAR_ITEMS = [
  {
    key: "dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    key: "content",
    icon: <Clapperboard />,
    label: "Content",
  },
  {
    key: "analytics",
    icon: <ChartNoAxesCombined />,
    label: "Analytics",
  },
  {
    key: "community",
    icon: <Users />,
    label: "Community",
  },
];

const ChannelLayout = () => {
  return (
    <SidebarProvider>
      <div className="channel">
        <Sidebar items={CHANNEL_SIDEBAR_ITEMS} />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChannelLayout;
