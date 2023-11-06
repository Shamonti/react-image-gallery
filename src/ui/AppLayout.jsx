import { useState } from 'react';

import Header from './Header';
import Gallery from '../features/Gallery';

function AppLayout() {
  const [gallery, setGallery] = useState([
    { id: 0, src: 'image-1.webp' },
    { id: 1, src: 'image-2.webp' },
    { id: 2, src: 'image-3.webp' },
    // { id: 3, src: 'image-4.webp' },
    // { id: 4, src: 'image-5.webp' },
    // { id: 5, src: 'image-6.webp' },
    // { id: 6, src: 'image-7.webp' },
    // { id: 7, src: 'image-8.webp' },
    // { id: 8, src: 'image-9.webp' },
    // { id: 10, src: 'image-10.jpeg' },
    // { id: 11, src: 'image-11.jpeg' },
  ]);

  return (
    <div className=" p-auto flex h-screen items-center justify-center overflow-auto bg-slate-300 pt-5">
      <div className="m-5 flex h-full flex-col  rounded-md bg-white">
        <Header gallery={gallery} setGallery={setGallery} />

        <main className="min-h-min">
          <Gallery gallery={gallery} setGallery={setGallery} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
