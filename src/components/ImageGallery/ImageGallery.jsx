import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ array, getLargeImage }) {
  return (
    <ul className={css.ImageGallery}>
      {array.map(({ id, tags, largeImageURL, webformatURL }) => (
        <li
          key={id}
          onClick={() => getLargeImage(largeImageURL)}
          className={css.ImageGalleryItem}
        >
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItem_image}
          />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
