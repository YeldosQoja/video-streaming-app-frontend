import { useParams } from "react-router-dom";

export default function Video() {
  const { videoId } = useParams();

  console.log({ videoId });

  return (
    <div>
      <p>{videoId}</p>
    </div>
  );
}
