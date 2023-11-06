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
      <div className="flex items-center justify-between px-5 py-3">
        <h2 className="font-bold tracking-tight">Gallery</h2>
      </div>
    );

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h2 className="font-bold tracking-tight">
        {selectedImageCount} images selected
      </h2>
      <Button gallery={gallery} setGallery={setGallery}>
        Delete file
      </Button>
    </div>
  );
}

Header.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Header;
