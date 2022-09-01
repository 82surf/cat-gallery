import getNodes from './lib/api';

import Loading from './components/Loading';
import ImageViewer from './components/ImageViewer';
import Breadcrumb from './components/Breadcrumb';
import Nodes from './components/Nodes';

const IMG_BASE_URL =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/publ';

class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      breadcrumbList: [],
      nodes: [],
      imageFilePath: '',
      showModal: false,
      isLoading: false,
    };

    this.loading = new Loading({ $app, initialState: this.state });
    this.imageViewer = new ImageViewer({
      $app,
      initialState: this.state,
      closeModal: () => {
        this.setState({
          ...this.state,
          imageFilePath: '',
          showModal: false,
        });
      },
    });
    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: this.state,
      onClick: (nodeId) => {
        if (nodeId) {
          while (true) {
            const bc = this.state.breadcrumbList;
            if (bc[bc.length - 1].id == nodeId) {
              break;
            }
            bc.pop();
          }
          this.render(nodeId);
        } else {
          this.state.breadcrumbList = [];
          this.render();
        }
      },
    });
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
        } else if (targetNode.type === 'FILE') {
          this.setState({
            ...this.state,
            imageFilePath: IMG_BASE_URL + targetNode.filePath,
            showModal: true,
          });
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
    this.imageViewer.setState(this.state);
    this.loading.setState(this.state);
  }

  async render(nodeId) {
    this.loading.setState({ ...this.state, isLoading: true });
    const response = await getNodes(nodeId ? nodeId : null);
    this.setState({
      ...this.state,
      isRoot: nodeId ? false : true,
      nodes: response,
      isLoading: false,
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
