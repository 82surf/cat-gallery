class Nodes {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);

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
      <div class="Node">
        <img src="./assets/prev.png" />
      </div>
    `;

    const nodeEls = this.state.nodes.map((node) => {
      const imgPath = getImgpath(node);
      return `
        <div class="Node">
          <img src="${imgPath}" />
          <div>${node.name}</div>
        </div>
      `;
    });

    this.$target.innerHTML = this.state.isRoot ? nodeEls : prevEl + nodeEls;
  }
}

export default Nodes;
