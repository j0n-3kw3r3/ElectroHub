
import {Outlet} from 'react-router-dom';
import Nav from '../components/home/navbar';
import Footer from '../components/home/footer';

const AuthLayout = () => {
  return (
    <div >
        <Nav/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
