class ImageViewer {
  constructor({ $app, initialState, closeModal }) {
    this.state = initialState;
    this.closeModal = closeModal;
    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageViewer';
    $app.appendChild(this.$target);

    this.$target.addEventListener('click', (event) => {
      if (event.target.classList.contains('ImageViewer')) {
        this.closeModal();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const sampleImgPath = '../../assets/sample_image.jpg';
    const imageViewerEl = `
      <div class="content">
        <img src="${this.state.imageFilePath}" />
      </div>
    `;
    this.$target.innerHTML = imageViewerEl;
    this.$target.style.display = this.state.showModal ? 'block' : 'none';
  }
}

export default ImageViewer;
