import "./globals.css";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";
import { Input } from "./components/Input";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <Header />

      <h1>My App</h1>
      <p>This is my app.</p>

      <Card>
        <Title>Card Title</Title>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam sequi ea
          ipsam! Ipsa nisi velit animi totam hic? Reprehenderit, quisquam
          officia odio voluptates aliquam pariatur animi accusamus quis minima
          beatae?
        </p>
        <Input placeholder="Enter your name" />
        <Button onClick={handleGetPosts}>Click me</Button>
      </Card>

      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <ul>
        {postsData.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
