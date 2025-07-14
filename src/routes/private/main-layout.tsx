import { Outlet } from "react-router-dom";
import "./styles.css";

export default function MainLayout() {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
}
