import Nodes from './components/Nodes';

class App {
  constructor($app) {
    this.state = {
      isRoot: false,
      nodes: [
        {
          id: '1',
          name: '노란고양이',
          type: 'DIRECTORY',
          filePath: null,
          parent: null,
        },
        {
          id: '3',
          name: '까만고양이',
          type: 'DIRECTORY',
          filePath: null,
          parent: null,
        },
      ],
    };

    this.nodes = new Nodes({ $app, initialState: this.state });
  }
}

export default App;
