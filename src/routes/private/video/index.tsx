import { useParams } from "react-router-dom";
import "./styles.css";
import { Share2, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import comments from "../../../comments.json";
import { Comment } from "../../../components/comment";
import videos from "../../../videos.json";
import { RecommendationVideo } from "../../../components/recommendation-video";

export default function Video() {
  const { videoId } = useParams();

  console.log({ videoId });

  return (
    <div className="container">
      <div className="primary">
        <div>
          <video
            id="player"
            controls
            src={`http://localhost:3000/videos/local/theoffice.mp4`}
          />
          <h1
            id="video-title"
            className="title">
            Video Title Will Go Here Video Title Will Go Here Video Title Will
            Go Here Video Title Will Go Here Video Title Will Go Here
          </h1>
        </div>
        <div className="top-row">
          <div id="channel">
            <a href="">
              <img
                src=""
                className="avatar"
              />
            </a>
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
                  <ThumbsUp />
                  432
                </button>
              </div>
              <div>
                <button className="action-btn">
                  <ThumbsDown />
                </button>
              </div>
            </div>
            <button className="action-btn">
              <Share2 />
              Share
            </button>
            <button className="action-btn">
              <Star />
              Save
            </button>
          </div>
        </div>
        <div className="desc-section">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            consequuntur nulla tenetur nesciunt sapiente cum impedit vero
            placeat culpa fuga ab, dignissimos delectus velit dolorem sint
            voluptatibus, similique perferendis cumque consectetur itaque totam!
            Nihil voluptates nostrum at est ullam vitae voluptate commodi, non
            odit voluptatem totam dolor fugiat eaque deserunt impedit! Sapiente,
            quo! Eos, quidem. Quis suscipit quasi veniam libero rem, sint a et
            ipsum, iure ad architecto esse iste quod sed, dolore natus eos
            laborum? Odit dolore, rerum similique accusamus ad, iste debitis
            provident, numquam repudiandae labore reiciendis natus praesentium!
            Odio deleniti pariatur, quaerat molestiae in cupiditate molestias
            amet, voluptate corrupti exercitationem laborum sequi nostrum sint
            adipisci, delectus voluptatibus iusto! Assumenda quae doloremque
            culpa neque natus hic. Ipsa, assumenda eligendi. Praesentium in
            veritatis asperiores velit? Natus possimus labore laborum iure
            consequuntur id, enim reiciendis assumenda reprehenderit rerum
            consequatur, saepe, earum ad perspiciatis eaque eius error officiis
            molestias blanditiis perferendis non sed corporis fuga quos. Sed
            enim pariatur quibusdam! Eius sint velit, repudiandae mollitia fuga
            nostrum doloremque! Quam suscipit est vero sunt maxime incidunt
            beatae? Quae quo temporibus illum corporis natus in aut, vero, rerum
            aliquam explicabo deleniti iure rem alias, placeat ullam unde non
            optio maxime reiciendis impedit quibusdam.
          </p>
        </div>
        <div className="comments-section">
          <h2>{`${comments.length} comments`}</h2>
          <ul className="comments-list">
            {comments.map((comment, idx) => (
              <li key={idx}>
                <Comment {...comment} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="secondary">
        <ul className="video-list">
          {videos.map((video) => (
            <li key={video.id}>
              <RecommendationVideo {...video} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
