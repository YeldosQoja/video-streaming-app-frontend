import "./styles.css";
import { getRelativeTime } from "../../utils/datetime";

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

export const HomeVideo = ({
  id,
  title,
  thumbnailUrl,
  createdAt,
  author,
}: Props) => {
  return (
    <article key={id}>
      <div className="video-thumbnail-container">
        <img
          src={thumbnailUrl}
          alt={title}
          width={640}
          height={360}
          className="video-thumbnail"
        />
      </div>
      <div className="video-details">
        <a href="">
          <img
            src={author.avatar}
            alt={author.name}
            width={48}
            height={48}
            className="video-author-avatar"
          />
        </a>
        <div className="video-info">
          <h3 className="video-title">
            {title} {title} {title}
          </h3>
          <a
            href=""
            className="video-author-name">
            {author.name}
          </a>
          <div className="video-meta">
            <span>345k views</span>
            <span>•</span>
            <span>{getRelativeTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
