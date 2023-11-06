import PropTypes from 'prop-types';

import { useRef } from 'react';
import Image from './Image';
import Checkbox from './Checkbox';

function Gallery({ gallery, setGallery }) {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(dragItem);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(dragOverItem.current);
  };

  const drop = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const copyListItems = [...gallery];
    const dragItemContent = copyListItems[dragItem.current];
    const dragOverItemContent = copyListItems[dragOverItem.current];

    if (dragOverItemContent.featured) {
      copyListItems[dragItem.current] = {
        ...dragOverItemContent,
        featured: true,
      };

      copyListItems[dragOverItem.current] = {
        ...dragItemContent,
        featured: false,
      };
    } else {
      copyListItems[dragItem.current] = { ...dragOverItemContent };
      copyListItems[dragOverItem.current] = { ...dragItemContent };
    }

    dragItem.current = null;
    dragOverItem.current = null;
    setGallery(copyListItems);
  };

  const handleSelect = (id) => {
    const updatedGallery = gallery.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });

    setGallery(updatedGallery);
  };

  return (
    <div className=" grid h-screen grid-cols-1 gap-3 border-t border-slate-300  p-5">
      {gallery.map((item, index) => (
        <div
          key={index}
          className="image-container max-w-[150px] rounded border border-slate-300"
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          draggable
        >
          <Checkbox item={item} handleSelect={handleSelect} />
          <Image item={item} index={index} />
        </div>
      ))}
    </div>
  );
}

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Gallery;
