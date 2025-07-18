import "./styles.css";
import videos from "@/videos.json";
import { HomeVideo } from "@/components";

const Home = () => {
  return (
    <div className="home">
      <h1>Browse</h1>
      <section className="video-grid">
        {videos.map((video) => {
          return (
            <HomeVideo
              key={video.id}
              {...video}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
