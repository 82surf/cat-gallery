import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';

import { getRootNodes } from '../lib/api.js';

class App {
  constructor($app) {
    this.$app = $app;
    this.state = {
      isRoot: false,
      path: ['노란고양이', '까만고양이'],
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

    this.initApp();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadcrumb = new Breadcrumb(this.$app, this.state);
    this.nodes = new Nodes(this.$app, this.state);
  }

  async initApp() {
    const response = await getRootNodes();
    this.state = {
      ...this.state,
      nodes: response,
    };
    this.setState(this.state);
  }
}

export default App;
