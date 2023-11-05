import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

function Header({ gallery, setGallery }) {
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  useEffect(() => {
    const count = gallery.filter(item => item.checked).length;
    setSelectedImageCount(count);
  }, [gallery]);

  const handleDelete = () => {
    const updatedGallery = gallery.filter(item => !item.checked);

    if (updatedGallery.length > 0) {
      updatedGallery[0].featured = true;
    }

    setGallery(updatedGallery);
  };

  if (!selectedImageCount) return <h2>Gallery</h2>;

  return (
    <h2>
      <span>{selectedImageCount} images selected</span>
      <button
        disabled={false}
        className='focus inline-block rounded bg-red-600 px-4 py-2 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed'
        onClick={handleDelete}
      >
        Delete
      </button>
    </h2>
  );
}

Header.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Header;
