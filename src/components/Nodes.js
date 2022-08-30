class Nodes {
  constructor({ $app, initialState, onClickNode, onClickBackBtn }) {
    this.state = initialState;
    this.onClickNode = onClickNode;
    this.onClickBackBtn = onClickBackBtn;

    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);
    this.nodeClickListener();

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
      <div class="Node" id="back-btn">
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

  nodeClickListener() {
    this.$target.addEventListener('click', (event) => {
      const targetEl =
        event.target.className === 'Node'
          ? event.target
          : event.target.parentNode;

      if (targetEl.id === 'back-btn') {
        this.onClickBackBtn();
      } else {
        const nodeId = targetEl.dataset.id;
        this.onClickNode(nodeId);
      }
    });
  }
}

export default Nodes;
