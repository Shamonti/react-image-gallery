import { useState } from 'react';

import Header from './Header';
import Gallery from '../features/Gallery';

function AppLayout() {
  const [gallery, setGallery] = useState([
    { id: 0, src: 'image-1.webp' },
    { id: 1, src: 'image-2.webp' },
    { id: 2, src: 'image-3.webp' },
  ]);

  return (
    <div className=" flex h-screen items-center  justify-center bg-slate-300 ">
      <div className="h-max rounded-md bg-white ">
        <Header gallery={gallery} setGallery={setGallery} />

        <main>
          <Gallery gallery={gallery} setGallery={setGallery} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
