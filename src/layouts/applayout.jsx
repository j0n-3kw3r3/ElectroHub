
import {Outlet} from 'react-router-dom';
import Nav from '../components/home/navbar';
import ProtectedRoute from '../config/protectedRoute';
import Footer from '../components/home/footer';

const Applayout = () => {
  return (
    // <ProtectedRoute>
      <div >
        <Nav />
      <Outlet />
      <Footer />
      </div>
    // </ProtectedRoute>
  );
};

export default Applayout;
