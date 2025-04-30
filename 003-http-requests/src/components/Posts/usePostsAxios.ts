import { useState } from "react";
import { Post } from ".";
import { CreatePost } from "./CreateForm";
import { createPost, getPosts } from "../../services/posts/posts";

interface UsePosts {
  postsData: Post[];
  loading: boolean;
  errorMessage: string | null;
  getPosts: () => void;
  createPost: (
    post: CreatePost,
    controller?: AbortController
  ) => Promise<Post | undefined>;
}

export const usePosts = (): UsePosts => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGetPosts = async () => {
    setLoading(true);

    try {
      const posts = await getPosts();
      setPostsData(posts);
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error(error);
    }

    setLoading(false);
  };

  const handleCreatePost = async (
    post: CreatePost,
    abortController?: AbortController
  ) => {
    setLoading(true);
    let result;

    try {
      console.log(abortController);
      const newPost = await createPost(post, abortController);

      result = newPost;
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    return result;
  };

  return {
    postsData,
    loading,
    errorMessage,
    getPosts: handleGetPosts,
    createPost: handleCreatePost,
  };
};
