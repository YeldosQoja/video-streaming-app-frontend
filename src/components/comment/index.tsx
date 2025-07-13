import { ThumbsDown, ThumbsUp } from "lucide-react";
import "./styles.css";

type Props = {
  username: string;
  date: string;
  text: string;
  avatarUrl: string;
};

export const Comment = ({ username, text, avatarUrl, date }: Props) => {
  return (
    <div className="comment">
      <a href="">
        <img
          className="comment-author-avatar"
          src={avatarUrl}
          alt=""
        />
      </a>
      <div className="comment-details">
        <div>
          <a
            href=""
            className="comment-author-name">{`@${username}`}</a>
          <span className="comment-date">{date}</span>
        </div>
        <p className="comment-text">{text}</p>
        <div className="comment-actions">
          <button className="comment-action-btn">
            <ThumbsUp />
          </button>
          <button className="comment-action-btn">
            <ThumbsDown />
          </button>
          <button className="comment-action-btn">Reply</button>
        </div>
      </div>
    </div>
  );
};
