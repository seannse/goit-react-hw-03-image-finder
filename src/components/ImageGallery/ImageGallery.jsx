import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ array, getLargeImage }) {
  return (
    <ul className={css.ImageGallery}>
      {array.map(({ id, tags, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          getLargeImage={getLargeImage}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLargeImage: PropTypes.func.isRequired,
};

export default ImageGallery;
