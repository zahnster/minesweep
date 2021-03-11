import Minesweeper from "../src/components/Minesweeper";

const Index = () => {
  return (
    <div className="App">
      <h1>Minesweeper.</h1>
      <Minesweeper />

      <div className="github-link">
        <a href="https://github.com/zahnster/minesweep">
          Check out my source code on GitHub
        </a>
      </div>
    </div>
  );
};

export default Index;
