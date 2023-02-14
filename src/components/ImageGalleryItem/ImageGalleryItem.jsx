import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  tags,
  largeImageURL,
  webformatURL,
  getLargeImage,
}) {
  return (
    <li
      onClick={() => getLargeImage(largeImageURL)}
      className={css.ImageGalleryItem}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  getLargeImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
