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
    const rootEl = `<div>root</div>`;
    const breadcrumbEls = this.state.breadcrumbList
      .map((breadcrumb) => `<div>${breadcrumb}</div>`)
      .join('');
    this.$target.innerHTML = rootEl + breadcrumbEls;
  }
}

export default Breadcrumb;
