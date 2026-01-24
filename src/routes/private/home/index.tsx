import "./styles.css";
import videos from "@/videos.json";
import { VideoCardGrid } from "@/components/video-card/grid";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Browse</h1>
      <section className="video-grid">
        {videos.map((video) => {
          return (
            <Link to={`watch/${video.id}`}>
              <VideoCardGrid
                key={video.id}
                video={video}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
