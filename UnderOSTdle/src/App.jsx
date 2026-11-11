import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div>
          <h1>UnderOSTdle</h1>
          <p>
            Connect the 2 Undertale/Deltarune songs using their shared Motifs!
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
