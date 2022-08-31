class Nodes {
  constructor({ $app, initialState, onClick, onClickBackBtn }) {
    this.state = initialState;
    this.onClick = onClick;
    this.onClickBackBtn = onClickBackBtn;

    this.init($app);
    this.render();
  }

  init($app) {
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);

    this.$target.addEventListener('click', (event) => {
      const targetEl =
        event.target.className == 'Node'
          ? event.target
          : event.target.parentNode;
      if (targetEl.id === 'back-btn') {
        this.onClickBackBtn();
      } else {
        const nodeId = targetEl.dataset.id;
        this.onClick(nodeId);
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const getImgpath = (node) => {
      switch (node.type) {
        case 'DIRECTORY':
          return './assets/directory.png';
        case 'FILE':
          return './assets/file.png';
      }
    };

    const prevEl = `
      <div class="Node" id="back-btn">
        <img src="./assets/prev.png" />
      </div>
    `;

    const nodeEls = this.state.nodes
      .map((node) => {
        const imgPath = getImgpath(node);
        return `
        <div class="Node" data-id="${node.id}">
          <img src="${imgPath}" />
          <div>${node.name}</div>
        </div>
      `;
      })
      .join('');

    this.$target.innerHTML = this.state.isRoot ? nodeEls : prevEl + nodeEls;
  }
}

export default Nodes;
