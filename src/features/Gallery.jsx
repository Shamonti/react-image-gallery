import PropTypes from 'prop-types';

import { useRef, useState } from 'react';
import Image from './Image';

function Gallery({ gallery, setGallery }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [selectedItems, setSelectedItems] = useState([]);

  /* Added necessary functions to implement the drag-and-drop functionality */
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(dragItem.current);
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
    console.log('end of drag');
  };

  /* Handling the selection of images when checked */
  const handleSelect = (id) => {
    const updatedGallery = gallery.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setGallery(updatedGallery);

    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <div className="grid h-full grid-cols-1 gap-y-3 overflow-auto border-t border-slate-300 p-5 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`group relative ${
              index === 0
                ? 'shadow-2xl shadow-emerald-200 sm:col-span-2 sm:row-span-2 sm:shadow-none'
                : 'col-span-1 row-span-1'
            }`}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            onTouchStart={(e) => dragStart(e, index)}
            onTouchMove={(e) => dragEnter(e, index)}
            onTouchEnd={drop}
            draggable
          >
            <div>
              <Image item={item} />
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Gallery;
