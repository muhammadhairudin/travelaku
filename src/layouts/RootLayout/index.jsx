import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';

const RootLayout = () => {
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout; 