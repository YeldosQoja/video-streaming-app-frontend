import "./styles.css";
import { ReactNode, useState } from "react";

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

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item.key);
    if (item.onClick) item.onClick();
  };

  return (
    <aside className="sidebar">
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

export default Sidebar;
