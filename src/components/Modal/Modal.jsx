import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
class Modal extends Component {
  onEscClose = e => {
    if (e.code === 'Escape') this.props.closeOnEscape();
  };

  closeImage = e => {
    if (e.target === e.currentTarget) {
      this.props.closeOnEscape();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

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
