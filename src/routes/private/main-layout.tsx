import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-screen">
      <Outlet />
    </div>
  );
}
