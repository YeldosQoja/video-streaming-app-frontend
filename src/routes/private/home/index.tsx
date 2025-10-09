import "./styles.css";
import videos from "@/videos.json";
import { useSidebar } from "@/components/sidebar";
import { VideoCardGrid } from "@/components/video-card/grid";

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
            <VideoCardGrid
              key={video.id}
              video={video}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
