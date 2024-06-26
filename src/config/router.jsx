import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {authRoutes, inAppRoutes} from './routes';
import AuthLayout from '../layouts/authlayout';
import Applayout from '../layouts/applayout';
import Page404 from '../pages/page404';

const renderRoutes = (layout, routes) => (
  <Routes>
    <Route element={layout}>
      {routes.map(({path, element}) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
);

const RouterComponent = () => (
  <Router>
    <Routes>
      <Route path="auth/*" element={renderRoutes(<AuthLayout />, authRoutes)} />
      <Route path="/*" element={renderRoutes(<Applayout />, inAppRoutes)} />
    </Routes>
  </Router>
);

export default RouterComponent;
