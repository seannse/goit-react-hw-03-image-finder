import css from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ loadMore, disabled }) {
  return (
    <button
      className={css.Button}
      disabled={disabled}
      type="button"
      onClick={loadMore}
    >
      Load More
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
