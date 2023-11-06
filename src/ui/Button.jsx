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
      className="focus inline-block rounded-md bg-red-600 px-2 text-sm font-bold tracking-tight text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-4 sm:py-2 sm:text-base"
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
