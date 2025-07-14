import videos from "../../videos.json";
import { getRelativeTime } from "../../utils/datetime";

const Home = () => {
  return (
    <div className="flex flex-col m-4">
      <h1>Browse</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-3">
        {videos.map((post) => {
          return (
            <article key={post.id}>
              <div className="aspect-video">
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-row mt-3 items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-3xl mr-2"
                />
                <div>
                  <h3>{post.title}</h3>
                  <div className="text-sm font-medium text-gray-700">
                    {post.author.name + "   " + getRelativeTime(post.createdAt)}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
