import "./styles.css";
import { VideoCardSearch } from "@/components/video-card/search";
import videos from "@/videos.json";
import { useSidebar } from "@/components/sidebar";

const Search = () => {
  const { open: sidebarOpen } = useSidebar();

  return (
    <div className="search" data-sidebar-state={sidebarOpen ? "expanded" : "collapsed"}>
      <div className="container flow-content">
        {videos.map((video) => (
          <VideoCardSearch
            key={video.id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
