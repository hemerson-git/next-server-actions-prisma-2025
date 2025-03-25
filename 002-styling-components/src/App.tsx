import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Title } from "./components/Title";

function App() {
  return (
    <>
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
        <Button>Click me</Button>
      </Card>
    </>
  );
}

export default App;
