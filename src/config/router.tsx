import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {authRoutes, inAppRoutes} from './routes';
import AppLayout from '@/layouts/applayout';
import Authlayout from '@/layouts/authlayout';

const renderRoutes = (layout, routes) => (
  <Routes>
    <Route element={layout}>
      {routes.map(({path, element}) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    {/* <Route path="*" element={<Page404 />} /> */}
  </Routes>
);

const RouterComponent = () => (
  <Router>
    <Routes>
      <Route path="auth/*" element={renderRoutes(<Authlayout />, authRoutes)} />
      <Route path="/*" element={renderRoutes(<AppLayout />, inAppRoutes)} />
    </Routes>
  </Router>
);

export default RouterComponent;
