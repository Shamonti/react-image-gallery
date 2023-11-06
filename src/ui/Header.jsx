import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import Button from './Button';

function Header({ gallery, setGallery }) {
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  useEffect(() => {
    const count = gallery.filter((item) => item.checked).length;
    setSelectedImageCount(count);
  }, [gallery]);

  if (!selectedImageCount) return <h2 className="text-red-800">Gallery</h2>;

  return (
    <h2>
      {selectedImageCount} images selected
      <Button gallery={gallery} setGallery={setGallery}>
        Delete
      </Button>
    </h2>
  );
}

Header.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Header;
