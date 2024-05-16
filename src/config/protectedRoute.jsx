
import React, {useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
  // const { handleLogout } = useUser();
  //  let loggedIn = useSelector((state) => state.auth.isAuthenticated);

  // const checkUserToken = useCallback(() => {
  //   if (!loggedIn) {
  //     // handleLogout();
  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   checkUserToken();
  // }, [checkUserToken, loggedIn]);

  return <React.Fragment>{loggedIn ? <>{children}</> : null}</React.Fragment>;
};

export default ProtectedRoute;
