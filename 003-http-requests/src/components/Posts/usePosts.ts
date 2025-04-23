import { useState } from "react";
import { Post } from ".";

interface UsePosts {
  postsData: Post[];
  loading: boolean;
  errorMessage: string | null;
  getPosts: () => void;
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

  return {
    postsData,
    loading,
    errorMessage,
    getPosts: handleGetPosts,
  };
};
