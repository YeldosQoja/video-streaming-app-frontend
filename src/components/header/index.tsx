import "./styles.css";
import { MenuIcon, SearchIcon, UploadIcon, UserIcon } from "lucide-react";
import { Input } from "../input";
import { useSidebar } from "../sidebar";

export const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__menu-btn"
          onClick={toggleSidebar}>
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
