import { Outlet } from "react-router-dom";
import "./styles.css";
import Sidebar from "@/components/sidebar";
import { History, Home, TrendingUp } from "lucide-react";

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
  return (
    <div className="main">
      <Sidebar
        items={HOME_SIDEBAR_ITEMS}
      />
      <Outlet />
    </div>
  );
}
