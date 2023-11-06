import PropTypes from 'prop-types';

function Image({ item }) {
  return (
    <img
      src={item.src}
      alt={item.src}
      className={`img h-48 rounded-md border border-slate-300 object-cover transition-colors duration-300 sm:h-full`}
      // draggable={item.featured}
    />
  );
}

Image.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default Image;
