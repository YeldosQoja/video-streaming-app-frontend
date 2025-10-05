import "./styles.css";
import { MenuIcon, SearchIcon, UploadIcon, UserIcon } from "lucide-react";
import { Input } from "../input";
import { useSidebar } from "../sidebar";
import { useDrawer } from "../drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { openDrawer } = useDrawer();
  const isMobile = useIsMobile();
  const location = useLocation();

  const handleMenuButtonClick = useCallback(() => {
    const parts = location.pathname.split("/");
    const route = parts[1];
    if (isMobile || route === "watch") {
      openDrawer();
    } else {
      toggleSidebar();
    }
  }, [isMobile, openDrawer, toggleSidebar, location]);

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__menu-btn"
          onClick={handleMenuButtonClick}>
          <MenuIcon />
        </button>
        <a
          href=""
          className="header__logo-btn">
          <img
            src=""
            alt="Logo"
            className="header__logo"
          />
        </a>
      </div>
      <div className="header__center">
        <div className="header__search-bar">
          <Input
            type="search"
            className="header__search-input"
          />
          <button className="header__search-btn">
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="header__right">
        <a
          href=""
          className="header__upload-btn">
          Upload
          <UploadIcon />
        </a>
        <button className="header__profile-btn">
          <UserIcon size={24} />
        </button>
      </div>
    </header>
  );
};
