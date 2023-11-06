import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import Button from './Button';

function Header({ gallery, setGallery }) {
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  useEffect(() => {
    const count = gallery.filter((item) => item.checked).length;
    setSelectedImageCount(count);
  }, [gallery]);

  if (!selectedImageCount)
    return (
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-semibold tracking-tight sm:font-bold">Gallery</h2>
      </div>
    );

  return (
    <div className="flex flex-col items-start justify-between px-3 py-2 sm:flex-row sm:items-center sm:px-5">
      <h2 className="font-semibold tracking-tight sm:font-bold">
        {selectedImageCount} {selectedImageCount > 1 ? 'images ' : 'image '}
        selected
      </h2>
      <Button gallery={gallery} setGallery={setGallery}>
        Delete {selectedImageCount > 1 ? 'files' : 'file'}
      </Button>
    </div>
  );
}

Header.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Header;
