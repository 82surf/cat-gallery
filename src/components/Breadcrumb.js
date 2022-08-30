class Breadcrumb {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    let breadcrumbEl = '<div>root</div>';

    if (!this.state.isRoot) {
      breadcrumbEl += this.state.path
        .map((item) => `<div>${item.name}</div>`)
        .join('');
    }

    this.$target.innerHTML = breadcrumbEl;
  }
}

export default Breadcrumb;
