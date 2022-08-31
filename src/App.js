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
          this.render(targetNode.id);
        } else if (node.type === 'FILE') {
          console.log('click file!');
        }
      },
      onClickBackBtn: async () => {
        const currNode = this.state.breadcrumbList.pop();
        if (this.state.breadcrumbList.length) {
          this.render(currNode.parent.id);
        } else {
          this.render();
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

  async render(nodeId) {
    const response = await getNodes(nodeId ? nodeId : null);
    this.setState({
      ...this.state,
      isRoot: nodeId ? false : true,
      nodes: response,
    });
  }

  async init() {
    try {
      this.render();
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
