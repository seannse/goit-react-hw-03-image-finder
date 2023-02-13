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
      const api = new API();
      api.query = search;
      api.page = page;

      try {
        this.setState({ status: 'pending', disabled: true });

        const imagesPre = await api.getPhotos();

        if (imagesPre.ok) {
          const imagesObj = await imagesPre.json();
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
        }
      } catch (error) {
        this.setState({ message: error, status: 'rejected' });
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
    this.setState({ search: value, images: [], page: 1 });
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
        <ImageGallery array={images} getLargeImage={this.getLargeImage} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <p style={{ textAlign: 'center' }}>{message}</p>
        )}
        {status === 'resolved' && images.length !== totalImages && (
          <Button loadMore={this.loadMore} disabled={disabled} />
        )}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
