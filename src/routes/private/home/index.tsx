import "./styles.css";
import videos from "@/videos.json";
import { HomeVideo } from "@/components";
import { useSidebar } from "@/components/sidebar";

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
