import { getRelativeTime } from "../../utils/datetime";
import "./styles.css";

type Author = {
  id: number;
  name: string;
  avatar: string;
  bio: string;
};

type Props = {
  id: number;
  title: string;
  desc: string;
  thumbnailUrl: string;
  createdAt: string;
  author: Author;
};

export const Video = ({ title, thumbnailUrl, createdAt, author }: Props) => {
  return (
    <div className="video-item">
      <a href="">
        <img
          className="video-item-thumbnail"
          src={thumbnailUrl}
          alt=""
        />
      </a>
      <div className="video-item-info">
        <h3 className="video-item-title">{title}</h3>
        <a
          href=""
          className="video-item-author-name">
          {author.name}
        </a>
        <div>
          <span>345k views</span>
          <span>•</span>
          <span>{getRelativeTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
