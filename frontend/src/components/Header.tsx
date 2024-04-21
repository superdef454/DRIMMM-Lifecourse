import { MegaMenu } from 'primereact/megamenu';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ROUT_FEED, ROUTE_MAIN_MENU, ROUTE_RATING, ROUTE_USER_PROFILE } from '../core/routes/constants/routePath.ts';
import { MenuItem } from 'primereact/menuitem';
import { useAppSelector } from '../core/store/hooks/useAppSelector.ts';
import { AuthSelector } from '../auth/selectors/AuthSelector.ts';
import HeaderLogo from '../../public/header-logo.svg';
import { useOAuth } from '../auth/hooks/useOAuth.ts';
import { CLIENT_ID, KEYCLOAK_AUTHORIZE_URL, KEYCLOAK_TOKEN_URL, REDIRECT_URL } from '../core/config/urls.ts';
import { authSlice } from '../auth/slices/authSlice.ts';
import { useAppDispatch } from '../core/store/hooks/useAppDispatch.ts';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(AuthSelector.getIsAuthenticated);
  const setIsAuthenticated = (value: boolean) => dispatch(authSlice.setIsAuthenticated(value));

  const { login, logout } = useOAuth({
    authorizeUrl: KEYCLOAK_AUTHORIZE_URL,
    tokenUrl: KEYCLOAK_TOKEN_URL,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URL,
    scope: 'openid',
    setIsAuthenticated,
  });

  const btnItems = [
    {
      label: 'Выйти',
      icon: 'pi pi-sign-out',
      command: logout,
    },
  ];

  const profile = () => {
    navigate(ROUTE_USER_PROFILE);
  };

  const start = (
    <img
      alt="logo"
      src={HeaderLogo}
      onClick={() => navigate(ROUTE_MAIN_MENU)}
      height="40"
      className="mr-2"
      style={{ cursor: 'pointer' }}
    />
  );

  const end = useMemo(() => {
    if (!isAuthenticated) {
      return <Button label="Войти" icon="pi pi-sign-in" onClick={login} />;
    }

    return <SplitButton label="Личный кабинет" icon="pi pi-user" model={btnItems} onClick={profile} />;
  }, [btnItems, isAuthenticated, login, profile]);

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'Лента',
        command: () => {
          navigate(ROUT_FEED);
        },
      },
      {
        label: 'Рейтинг',
        command: () => {
          navigate(ROUTE_RATING);
        },
      },
      // {
      //   label: 'Внедрение',
      //   command: () => {
      //     navigate(ROUTE_INTEGRATION);
      //   },
      // },
      // {
      //   label: 'Отзывы',
      //   command: () => {
      //     navigate(ROUTE_FEEDBACK);
      //   },
      // },
    ],
    [],
  );

  return (
    <MegaMenu
      orientation="horizontal"
      model={items}
      start={start}
      end={end}
      breakpoint="960px"
      style={{ position: 'sticky', padding: '10px 50px' }}
    />
  );
};
