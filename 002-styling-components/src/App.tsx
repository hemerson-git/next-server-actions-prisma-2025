import "./globals.css";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";
import { Input } from "./components/Input";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";

function App() {
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
        <Button>Click me</Button>
      </Card>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
