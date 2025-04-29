import { Post } from "../../components/Posts";
import { baseURL } from "../axios";

export const getPosts = async () => {
  const response = await baseURL.get<Post[]>("/posts");
  const posts = response.data;
  console.log(response.data);
  return posts;
};
