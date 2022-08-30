import Breadcrumb from './components/Breadcrumb';
import Nodes from './components/Nodes';

class App {
  constructor($app) {
    this.state = {
      isRoot: false,
      breadcrumbList: ['노란고양이', '까만고양이'],
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

    this.breadcrumb = new Breadcrumb({ $app, initialState: this.state });
    this.nodes = new Nodes({ $app, initialState: this.state });
  }
}

export default App;
