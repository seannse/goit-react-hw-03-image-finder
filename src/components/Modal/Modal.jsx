import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

  onEscClose = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  closeImage = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={css.overlay} onClick={this.closeImage}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
