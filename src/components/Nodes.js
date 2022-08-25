class Nodes {
  constructor($app, initialState) {
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    this.state = initialState;
    $app.appendChild(this.$target);

    this.render();
  }

  render() {
    const nodesEl = this.state.nodes
      .map((node) => {
        const imgPath = this.getImgPath(node);
        return `
          <div class="Node">
            <img src="${imgPath}" />
            <div>${node.name}</div>
          </div>
        `;
      })
      .join('');

    this.$target.innerHTML = nodesEl;
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
}

export default Nodes;
