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
    this.nodes = new Nodes({
      $app,
      initialState: this.state,
      onClick: async (nodeId) => {
        let targetNode;
        for (let node of this.state.nodes) {
          if (node.id == nodeId) {
            targetNode = node;
          }
        }

        if (targetNode.type === 'DIRECTORY') {
          this.state.breadcrumbList.push(targetNode);
          const request = await getNodes(targetNode.id);
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: request,
          });
        } else if (node.type === 'FILE') {
          console.log('click file!');
        }
      },
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadcrumb.setState(this.state);
    this.nodes.setState(this.state);
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
