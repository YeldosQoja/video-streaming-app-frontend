import { getRelativeTime } from "@/utils/datetime";
import "./styles.css";
import { ListVideoIcon } from "lucide-react";

export const PlaylistCard = () => {
  return (
    <div className="playlist-card flow-content">
      <div className="thumbnail">
        <img
          src=""
          alt=""
          className="thumbnail__img"
        />
        <div className="thumbnail__foreground">
          <ListVideoIcon size={28} />
          <span>54</span>
        </div>
      </div>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <span className="playlist-card__updated-time">
        {getRelativeTime(new Date())}
      </span>
    </div>
  );
};
