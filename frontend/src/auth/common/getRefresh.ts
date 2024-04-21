import { useCallback, useMemo } from 'react';
import { localStorageNames } from '../../main/constants/localStorageNames.ts';
import { ITokens } from '../interfaces/ITokens.ts';
import { CLIENT_ID, KEYCLOAK_TOKEN_URL, REDIRECT_URL } from '../../core/config/urls.ts';
import { authSlice } from '../slices/authSlice.ts';
import { store } from '../../core/store/constants/store.ts';
import { ITokenResponse } from '../interfaces/ITokenResponse.ts';

export const getRefresh = () => {
  const tokenUrl = KEYCLOAK_TOKEN_URL;
  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URL;
  const setIsAuthenticated = (value: boolean) => store.dispatch(authSlice.setIsAuthenticated(value));

  const buildTokens = useCallback(
    (data: ITokenResponse): ITokens => ({
      accessToken: data.token_type + ' ' + data.access_token,
      expires: new Date().getTime() + (data.expires_in - 5) * 1000,
      refreshToken: data.refresh_token,
    }),
    [],
  );

  const refreshPromises: Record<string, Promise<string>> = useMemo(() => ({}), []);

  const getRefreshToken = useCallback(() => {
    const storageTokens = window.localStorage.getItem(localStorageNames.TOKEN) as string;
    const tokens = JSON.parse(storageTokens) as ITokens;

    if (Object.prototype.hasOwnProperty.call(refreshPromises, tokens.refreshToken)) {
      return refreshPromises[tokens.refreshToken];
    }

    refreshPromises[tokens.refreshToken] = fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        redirect_uri: redirectUri,
        access_type: 'offline',
        refresh_token: tokens.refreshToken,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .then(async response => {
        const data = await response.json();
        const tokens = buildTokens(data);
        window.localStorage.setItem(localStorageNames.TOKEN, JSON.stringify(tokens));
        window.localStorage.setItem(localStorageNames.ALL, JSON.stringify(data));
        window.localStorage.setItem(localStorageNames.ID_TOKEN, JSON.stringify(data.id_token));
        setIsAuthenticated(true);
        return tokens.accessToken;
      })
      .catch(error => {
        window.localStorage.removeItem(localStorageNames.TOKEN);
        setIsAuthenticated(false);
        throw error;
      });

    return refreshPromises[tokens.refreshToken];
  }, [buildTokens, clientId, redirectUri, refreshPromises, setIsAuthenticated, tokenUrl]);

  return { getRefreshToken };
};
