import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';

import getNodes from '../lib/api.js';

class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      path: [],
      nodes: [],
    };

    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        path: this.state.path,
      },
    });

    this.nodes = new Nodes({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      },
      onClickNode: async (nodeId) => {
        let targetNode;
        for (let node of this.state.nodes) {
          if (node.id == nodeId) {
            targetNode = node;
          }
        }

        switch (targetNode.type) {
          case 'DIRECTORY':
            const response = await getNodes(nodeId);
            this.state.path.push(targetNode);
            this.setState({
              ...this.state,
              isRoot: false,
              nodes: response,
            });
            break;
          case 'FILE':
            console.log('click file!');
            break;
        }
      },
      onClickBackBtn: async () => {
        this.state.path.pop();
        if (this.state.path.length === 0) {
          const response = await getNodes();
          this.setState({
            ...this.state,
            isRoot: true,
            nodes: response,
          });
        } else {
          const currNode = this.state.path[this.state.path.length - 1];
          const response = await getNodes(currNode.id);
          this.setState({
            ...this.state,
            nodes: response,
          });
        }
      },
    });

    this.initApp();
  }

  setState(nextState) {
    this.state = nextState;
    this.nodes.setState(this.state);
    this.breadcrumb.setState(this.state);
  }

  async initApp() {
    const response = await getNodes();
    const initState = {
      ...this.state,
      nodes: response,
    };
    this.setState(initState);
  }
}

export default App;
