import css from './App.module.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './API';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

const api = new API();

export class App extends Component {
  state = {
    search: '',
    images: [],
    status: 'idle',
    page: 1,
    largeImageURL: null,
    message: '',
    totalImages: 0,
    disabled: false,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ status: 'pending', disabled: true });

        api.query = search;
        api.page = page;
        const imagesObj = await api.getPhotos();
        const images = imagesObj.hits;

        if (!images.length) {
          this.setState({
            status: 'rejected',
            message: 'Nothing found',
          });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
          totalImages: imagesObj.totalHits,
        }));
      } catch (error) {
        this.setState({ message: error.message, status: 'rejected' });
      } finally {
        this.setState({ disabled: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = value => {
    this.setState({ search: value, images: [], page: 1, totalImages: 0 });
  };

  getLargeImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, status, largeImageURL, message, totalImages, disabled } =
      this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar handleSubmit={this.handleSubmit} disabled={disabled} />
        {images.length !== 0 && (
          <ImageGallery array={images} getLargeImage={this.getLargeImage} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <p style={{ textAlign: 'center' }}>{message}</p>
        )}
        {status === 'resolved' && images.length !== totalImages && (
          <Button loadMore={this.loadMore} />
        )}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
