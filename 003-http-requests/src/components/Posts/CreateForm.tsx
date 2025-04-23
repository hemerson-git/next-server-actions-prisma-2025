import { Post } from ".";
import { PostForm } from "./posts.styled";
import { usePosts } from "./usePosts";

export type CreatePost = Omit<Post, "id">;

export const CreateForm = () => {
  const { createPost } = usePosts();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const post: CreatePost = {
      userId: 1,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    };

    const newPost = await createPost(post);
    console.log(newPost);
  };

  return (
    <PostForm onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="body" placeholder="Body" />
      <button type="submit">Submit</button>
    </PostForm>
  );
};
