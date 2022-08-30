class Nodes {
  constructor({ $app, initialState, onClickNode }) {
    this.state = initialState;
    this.onClickNode = onClickNode;

    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);
    this.nodeClickHandler();

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const nodesEl = this.state.nodes
      .map((node) => {
        const imgPath = this.getImgPath(node);
        return `
          <div class="Node" data-id="${node.id}">
            <img src="${imgPath}" />
            <div>${node.name}</div>
          </div>
        `;
      })
      .join('');

    const prevEl = `
      <div class="Node">
        <img src="./assets/prev.png" />
      </div>
    `;

    this.$target.innerHTML = this.state.isRoot ? nodesEl : prevEl + nodesEl;
  }

  getImgPath(node) {
    switch (node.type) {
      case 'DIRECTORY':
        return './assets/directory.png';
        break;
      case 'FILE':
        return './assets/file.png';
        break;
    }
  }

  nodeClickHandler() {
    this.$target.addEventListener('click', (event) => {
      const nodeId = event.target.dataset.id
        ? event.target.dataset.id
        : event.target.parentNode.dataset.id;

      this.onClickNode(nodeId);
    });
  }
}

export default Nodes;
