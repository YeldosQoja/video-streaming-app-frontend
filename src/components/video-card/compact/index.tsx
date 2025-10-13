import "./styles.css";
import { Video } from "@/types/video";
import { getRelativeTime } from "@/utils/datetime";
import { VideoThumbnail } from "../video-thumbnail";

type Props = {
  video: Video;
};

export const VideoCardCompact = ({ video }: Props) => {
  const { thumbnail, duration, channel, title, createdAt, viewCount } = video;
  return (
    <div className="video-card-compact">
      <VideoThumbnail
        src={thumbnail}
        className="thumbnail"
        duration={duration}
      />
      <div className="info">
        <h3 className="title">
          {title} {title} {title}
        </h3>
        <a
          href=""
          className="channel-name">
          {channel.name}
        </a>
        <div className="meta">
          <span>{viewCount} views</span>
          <span>•</span>
          <span>{getRelativeTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
