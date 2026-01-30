import { useParams } from "react-router-dom";
import Blog from "./Blog";

const BlogTag = () => {
  const { tag } = useParams<{ tag: string }>();
  return <Blog initialTag={tag ?? ""} />;
};

export default BlogTag;
