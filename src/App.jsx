import css from './App.module.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    status: 'idle',
    error: null,
    page: 1,
    largeImageURL: null,
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
          images.length
            ? this.setState(prevState => ({
                images: [...prevState.images, ...images],
                status: 'resolved',
              }))
            : this.setState({ status: 'rejected' });
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
    const { images, status, largeImageURL } = this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery array={images} getLargeImage={this.getLargeImage} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>Nothing found</p>}
        {status === 'resolved' && images.length && (
          <button className={css.Button} type="button" onClick={this.loadMore}>
            Load More
          </button>
        )}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
