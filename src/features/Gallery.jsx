import PropTypes from 'prop-types';

import { useRef, useState } from 'react';
import Image from './Image';

function Gallery({ gallery, setGallery }) {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [selectedItems, setSelectedItems] = useState([]);

  const disableScroll = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('touchmove', preventScroll, { passive: false });
    }
  };

  const enableScroll = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('touchmove', preventScroll, {
        passive: false,
      });
    }
  };

  const preventScroll = (e) => {
    e.preventDefault();
  };

  /* Added necessary functions to implement the drag-and-drop functionality */
  const dragStart = (e, position) => {
    dragItem.current = position;
    /* To prevent scrolling for mobile views when a item is selected for drag */
    disableScroll();
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
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
    enableScroll();
  };

  /* Added necessary functions to implement the drag-and-drop functionality in mobile*/
  const touchMove = (e, position) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      const touch = e.targetTouches[0]; // Get the first touch

      const x = touch.clientX;
      const y = touch.clientY;

      const elements = document.elementsFromPoint(x, y);

      if (elements) {
        const imageElement = elements.find((element) => {
          return element.classList.contains('img');
        });

        if (imageElement) {
          const index = gallery.findIndex(
            (item) => item.src === imageElement.getAttribute('src'),
          );

          if (index !== -1) {
            dragOverItem.current = index;
            console.log(position);
          }
        }
      }
    }
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
            onTouchMove={(e) => {
              touchMove(e, index);
            }}
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
