import PropTypes from 'prop-types';

function Button({ children, gallery, setGallery }) {
  const handleDelete = () => {
    const updatedGallery = gallery.filter((item) => !item.checked);

    if (updatedGallery.length > 0) {
      updatedGallery[0].featured = true;
    }

    setGallery(updatedGallery);
  };

  return (
    <button
      disabled={false}
      className="focus inline-block px-4 py-2 font-bold tracking-tight text-red-700 transition-colors duration-300 hover:rounded hover:bg-red-500 hover:text-red-50 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed"
      onClick={handleDelete}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
  'gallery.filter': PropTypes.array.isRequired,
};

export default Button;
