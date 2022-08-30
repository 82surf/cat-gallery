import getNodes from './lib/api';

import Breadcrumb from './components/Breadcrumb';
import Nodes from './components/Nodes';

class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      breadcrumbList: [],
      nodes: [],
    };

    this.breadcrumb = new Breadcrumb({ $app, initialState: this.state });
    this.nodes = new Nodes({ $app, initialState: this.state });

    this.init();
  }

  setState(nextState) {
    this.breadcrumb.setState(nextState);
    this.nodes.setState(nextState);
  }

  async init() {
    try {
      const response = await getNodes();
      this.setState({
        ...this.state,
        nodes: response,
      });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
