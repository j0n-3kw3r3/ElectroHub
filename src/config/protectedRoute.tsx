import {useUser} from '@/hooks/useUser';
import React, {useEffect, useCallback} from 'react';

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({children}) => {
  const {loggedIn, handleLogout} = useUser();

  const checkUserToken = useCallback(() => {
    if (!loggedIn) {
      handleLogout();
    }
  }, [loggedIn]);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken, loggedIn]);

  return <React.Fragment>{loggedIn ? <>{children}</> : null}</React.Fragment>;
};

export default ProtectedRoute;
