import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../../components/Header.tsx';
import classes from './Layout.module.scss';
import { Footer } from '../../components/MainPage/Footer.tsx';
import { useMemo } from 'react';

export const Layout = () => {
  const location = useLocation();

  const footer = useMemo(() => {
    if (location.pathname === '/') {
      return <Footer />;
    }

    return <></>;
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>
      {footer}
    </div>
  );
};
