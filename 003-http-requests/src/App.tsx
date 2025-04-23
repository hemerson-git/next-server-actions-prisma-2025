import "./globals.css";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";
import { Input } from "./components/Input";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { Posts } from "./components/Posts";
import { usePosts } from "./components/Posts/usePosts";

function App() {
  const { errorMessage, loading, postsData, getPosts } = usePosts();

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
        <Button onClick={getPosts}>Click me</Button>
      </Card>

      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <Posts posts={postsData} />

      <Footer />
    </ThemeProvider>
  );
}

export default App;
