import PropTypes from 'prop-types';

import { useRef } from 'react';
import Image from './Image';
// import Checkbox from './Checkbox';

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
    <>
      <div className="grid grid-cols-3  gap-3 border-t border-slate-300 p-5">
        {gallery.map((item, index) => (
          <div
            key={index}
            className="group relative  max-w-[150px]  rounded border border-slate-300"
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >
            <Image item={item} index={item} />

            <div className="group-hover:ease absolute left-0 top-0 flex h-0 w-full flex-col items-center justify-center bg-neutral-900  opacity-0 group-hover:h-full group-hover:opacity-50 group-hover:transition-colors group-hover:duration-500">
              <input
                type="checkbox"
                value={item.id}
                className="checkbox"
                onChange={() => handleSelect(item.id)}
                checked={item.checked || false}
              />
            </div>
            {/* <Checkbox item={item} onChange={handleSelect} /> */}
          </div>
        ))}
      </div>
      {/* <div className="group relative w-96">
        <img
          className="w-full object-cover"
          src="https://www.kindacode.com/wp-content/uploads/2022/06/t-shirt-example.png"
        />
        <div className="absolute left-0 top-0 flex h-0 w-full flex-col items-center justify-center bg-indigo-700 opacity-0 duration-500 group-hover:h-full group-hover:opacity-100">
          <h1 className="text-2xl text-white">Fiction T-Shirt Store</h1>
          <a
            className="mt-5 rounded-full bg-amber-400 px-8 py-3 duration-300 hover:bg-amber-600"
            href="#"
          >
            Continue Shopping
          </a>
        </div>
      </div> */}
    </>
  );
}

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Gallery;
