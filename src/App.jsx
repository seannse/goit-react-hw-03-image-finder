import css from './App.module.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    error: null,
    page: 1,
    largeImageURL: null,
    message: '',
  };

  static API_KEY = '32832453-e3254b3d4cedd40db7f429e0f';

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });

        const searchParams = new URLSearchParams({
          q: this.state.search,
          page: this.state.page,
          key: App.API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        });

        const imagesPre = await fetch(
          `https://pixabay.com/api/?${searchParams}`
        );

        if (imagesPre.ok) {
          const imagesObj = await imagesPre.json();
          const images = imagesObj.hits;
          if (images.length === 12) {
            this.setState(prevState => ({
              images: [...prevState.images, ...images],
              status: 'resolved',
            }));
          } else if (images.length > 0 && images.length < 12) {
            this.setState(prevState => ({
              images: [...prevState.images, ...images],
              message: '',
              status: 'rejected',
            }));
          } else {
            this.setState({
              message: 'Nothing found',
              status: 'rejected',
            });
          }
        }
      } catch (error) {
        console.log(error);
        this.setState({ error, status: 'rejected' });
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
    const { images, status, largeImageURL, message } = this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery array={images} getLargeImage={this.getLargeImage} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>{message}</p>}
        {status === 'resolved' && <Button loadMore={this.loadMore} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
