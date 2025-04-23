export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
};

export const Posts = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
