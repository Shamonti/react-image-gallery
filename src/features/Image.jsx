import PropTypes from 'prop-types';

function Image({ item }) {
  return (
    <img
      src={item.src}
      alt={item.src}
      className={`img rounded-md border border-slate-300 object-cover transition-colors duration-300`}
      draggable={item.featured}
    />
  );
}

Image.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Image;
