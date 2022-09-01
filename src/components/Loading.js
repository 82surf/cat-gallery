class Loading {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'Modal Loading';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.toggle();
  }

  render() {
    this.$target.innerHTML = `
      <div class="content">
        <img src="../../assets/nyan-cat.gif" />
      </div>
    `;
  }

  toggle() {
    this.$target.style.display = this.state.isLoading ? 'block' : 'none';
  }
}

export default Loading;
