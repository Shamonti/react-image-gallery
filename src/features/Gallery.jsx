import PropTypes from 'prop-types';

import { useRef, useState } from 'react';
import Image from './Image';
// import Checkbox from './Checkbox';

function Gallery({ gallery, setGallery }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [selectedItems, setSelectedItems] = useState([]);

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

    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id)); // Deselect the item
    } else {
      setSelectedItems([...selectedItems, id]); // Select the item
    }
  };

  return (
    <>
      <div className="grid grid-cols-3  gap-3 border-t border-slate-300 p-5">
        {gallery.map((item, index) => (
          <div
            key={index}
            className="group relative max-w-[150px] "
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >
            <Image item={item} index={item} />

            {/* <div className=" absolute left-0 top-0 h-0 w-full rounded-md border border-slate-300 bg-neutral-900 opacity-0 group-hover:h-full group-hover:opacity-50 group-hover:transition-colors group-hover:duration-500"> */}
            <div
              className={`absolute left-0 top-0 h-0 w-full rounded-md border border-slate-300 bg-neutral-900  opacity-0 transition-opacity duration-150 group-hover:h-full group-hover:opacity-50 group-hover:transition-opacity group-hover:duration-150 ${
                selectedItems.includes(item.id)
                  ? 'h-full opacity-50 transition-opacity duration-150'
                  : 'opacity-0'
              }`}
            >
              <input
                type="checkbox"
                value={item.id}
                className="m-3 h-5 w-5"
                onChange={() => handleSelect(item.id)}
                checked={item.checked || false}
              />
              {/* <Checkbox item={item} onChange={handleSelect} /> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// ${
//   checkboxSelected ? 'h-full opacity-50' : ''
// }

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Gallery;
