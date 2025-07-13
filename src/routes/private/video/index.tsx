import { useParams } from "react-router-dom";
import "./styles.css";
import { Share2, Star, ThumbsDown, ThumbsUp } from "lucide-react";

export default function Video() {
  const { videoId } = useParams();

  console.log({ videoId });

  return (
    <div className="container">
      <div className="primary">
        <video
          id="player"
          controls
          src={`http://localhost:3000/videos/local/theoffice.mp4`}
        />
        <h1 id="video-title">Video Title Will Go Here</h1>
        <div className="top-row">
          <div id="channel">
            <img
              src=""
              className="avatar"
            />
            <div className="channel-info">
              <a
                id="channel-name"
                href="">
                yeldos qoja
              </a>
              <p className="sub-count">365k subscribers</p>
            </div>
            <button className="sub-btn">Subscribe</button>
          </div>
          <div className="actions">
            <div className="btn-group">
              <div>
                <button className="action-btn">
                  <ThumbsUp color="white" />
                  432
                </button>
              </div>
              <div>
                <button className="action-btn">
                  <ThumbsDown color="white" />
                </button>
              </div>
            </div>
            <button className="action-btn">
              <Share2 color="white" />
              Share
            </button>
            <button className="action-btn">
              <Star />
              Save
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
