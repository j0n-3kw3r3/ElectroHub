import {createContext, useState, useMemo, useCallback, useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {currentUserEP} from '@/services/user';
import {refreshTokenEP} from '@/services/auth';
import Loader from '@/components/molecules/loader';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  // const [user, setUser] = useState<LoggedInUserType>(null);
  const [userIsValid, setUserIsValid] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const {isSuccess, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['user'],
    queryFn: () => currentUserEP,
    enabled: !!token,
    retry: 1,
    refetchOnWindowFocus: true,
  });
  const loading = initialLoad || isLoading;

  const {mutateAsync} = useMutation({
    mutationFn: refreshTokenEP,
    onSuccess: data => {
      const newAccessToken = data?.data?.data?.token;
      localStorage?.setItem('accessToken', newAccessToken);
      setToken(newAccessToken);
    },
    onError: error => {
      handleLogout();
      console.log(error);
    },
  });

  const handleLogin = useCallback(resp => {
    localStorage?.setItem('accessToken', resp?.data?.data?.accessToken);
    localStorage?.setItem('refreshToken', resp?.data?.data?.refreshToken);
    setToken(resp);
    setLoggedIn(true);
  }, []);

  const handleGuestLogin = useCallback(resp => {
    localStorage?.setItem('accessToken', resp?.data?.data?.token);
    localStorage?.setItem('refreshToken', resp?.data?.data?.refreshToken);
    setToken(resp);
    setLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage?.removeItem('accessToken');
    localStorage?.removeItem('refreshToken');
    window.location.href = '/auth/login';
    setToken('');
    setLoggedIn(false);
  }, []);

  /* Function that gets refeshed token */
  const getRefreshToken = async () => {
    try {
      const currentRefreshToken = localStorage.getItem('refreshToken');

      await mutateAsync({
        refreshToken: currentRefreshToken,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // if it returns an error of 403, it means the token is invalid, and if the location isnt the login page, redirect to login
  useEffect(() => {
    if (
      isError &&
      // @ts-ignore
      (error?.response?.status === 400 || error?.response?.status === 401) &&
      window.location.pathname !== '/auth/login'
    ) {
      getRefreshToken();
    }
  }, [isError, error]);

  useEffect(() => {
    const lsToken = localStorage.getItem('accessToken');
    if (lsToken) {
      localStorage.setItem('accessToken', lsToken);
      setLoggedIn(true);
      setToken(lsToken);
    }
    setInitialLoad(false);
  }, []);

  /* Checks if a used is allowed to be logged in by the success of the status endpoint */
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setUserIsValid(true);
    }
  }, [isSuccess]);

  const value = useMemo(
    () => ({
      //   user,
      //   setUser,
      handleLogin,
      handleGuestLogin,
      handleLogout,
      loggedIn,
      userIsValid,
      setUserIsValid,
    }),
    [
      //   user,
      //   setUser,
      handleLogin,
      handleGuestLogin,
      handleLogout,
      loggedIn,
      userIsValid,
      setUserIsValid,
    ]
  );

  return (
    <UserContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
