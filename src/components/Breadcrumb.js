class Breadcrumb {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';
    $app.appendChild(this.$target);
    this.$target.addEventListener('click', (event) => {
      const className = event.target.className;
      const bc = this.state.breadcrumbList;
      if (bc[bc.length - 1].id !== event.target.dataset.id) {
        this.onClick(className === 'root' ? null : event.target.dataset.id);
      }
    });

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const rootEl = `<div class="root">root</div>`;
    const breadcrumbEls = this.state.breadcrumbList
      .map(
        (breadcrumb) =>
          `<div data-id="${breadcrumb.id}">${breadcrumb.name}</div>`,
      )
      .join('');
    this.$target.innerHTML = rootEl + breadcrumbEls;
  }
}

export default Breadcrumb;
