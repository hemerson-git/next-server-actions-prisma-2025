import { useState } from "react";
import { Post } from ".";
import { CreatePost } from "./CreateForm";
import { getPosts } from "../../services/posts/posts";

interface UsePosts {
  postsData: Post[];
  loading: boolean;
  errorMessage: string | null;
  getPosts: () => void;
  createPost: (post: CreatePost) => Promise<Post | undefined>;
}

export const usePosts = (): UsePosts => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGetPosts = async () => {
    setLoading(true);

    try {
      const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!posts.ok) {
        throw new Error("Something went wrong");
      }

      const postsJson: Post[] = await posts.json();
      setPostsData(postsJson);
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error(error);
    }

    setLoading(false);
  };

  const handleCreatePost = async (post: CreatePost) => {
    setLoading(true);
    let result;

    try {
      const axiosPosts = getPosts();
      console.log("axios", axiosPosts);

      const newPost = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );

      if (!newPost.ok) {
        throw new Error("Something went wrong");
      }

      const newPostJson: Post = await newPost.json();
      result = newPostJson;
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
