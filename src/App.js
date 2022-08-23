import Nodes from "./components/Nodes.js";

class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      nodes: [
        {
          id: "1",
          name: "노란고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
        {
          id: "3",
          name: "까만고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
      ],
    };

    this.nodes = new Nodes($app, this.state);
  }
}

export default App;
