import { Post } from ".";
import { PostForm } from "./posts.styled";
import { usePosts } from "./usePostsAxios";

export type CreatePost = Omit<Post, "id">;

export const CreateForm = () => {
  const { createPost } = usePosts();
  const controller = new AbortController();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const post: CreatePost = {
      userId: 1,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    };

    const newPost = await createPost(post, controller);
    console.log(newPost);
  };

  const handleCancelSubmit = () => {
    controller.abort();
  };

  return (
    <PostForm onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="body" placeholder="Body" />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancelSubmit}>
        Cancel
      </button>
    </PostForm>
  );
};
