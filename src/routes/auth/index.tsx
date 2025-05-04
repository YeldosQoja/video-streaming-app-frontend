import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="min-h-screen w-screen flex">
      <Outlet />
    </div>
  );
}
