import "./styles.css";
import videos from "@/videos.json";
import { useSidebar } from "@/components/sidebar";
import { VideoCardGrid } from "@/components/video-card/grid";
import { Link } from "react-router-dom";

const Home = () => {
  const { open: sidebarOpen } = useSidebar();

  return (
    <div
      className="home"
      data-sidebar-state={sidebarOpen ? "expanded" : "collapsed"}>
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
