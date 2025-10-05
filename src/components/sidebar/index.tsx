import "./styles.css";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type SidebarContextProps = {
  open: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

const useSidebar = () => {
  const value = useContext(SidebarContext);
  if (!value) {
    throw new Error("useSidebar must be used with a SidebarProvider!");
  }
  return value;
};

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggleSidebar,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};

type MenuItem = {
  key: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

type Props = {
  items: MenuItem[];
};

const Sidebar = ({ items }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string>();
  const { open } = useSidebar();

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item.key);
    if (item.onClick) item.onClick();
  };

  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>
      <nav>
        <ul className="list">
          {items.map((i) => (
            <li
              key={i.key}
              className={`sidebar-item${
                selectedItem === i.key ? " selected" : ""
              }`}>
              <a onClick={() => handleClick(i)}>
                {i.icon}
                <span className="sidebar-item-label">{i.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export { SidebarProvider, useSidebar, Sidebar };
