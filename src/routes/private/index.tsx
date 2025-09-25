import { Outlet } from "react-router-dom";
import "./styles.css";
import Sidebar from "@/components/sidebar";
import { History, Home, TrendingUp } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="main">
      <Sidebar
        items={[
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
        ]}
      />
      <Outlet />
    </div>
  );
}
