import { Post } from "../../components/Posts";
import { CreatePost } from "../../components/Posts/CreateForm";
import { baseURL } from "../axios";

export const getPosts = async () => {
  const response = await baseURL.get<Post[]>("/posts");
  const posts = response.data;
  console.log(response.data);
  return posts;
};

export const createPost = async (
  post: CreatePost,
  controller?: AbortController
) => {
  const response = await baseURL.post<Post>("/posts", post, {
    signal: controller?.signal,
  });
  const newPost = response.data;
  return newPost;
};
