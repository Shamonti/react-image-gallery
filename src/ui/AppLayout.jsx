import Header from './Header';
import Gallery from '../features/Gallery';

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default AppLayout;
