import Cookies from "universal-cookie";

import userActions from "user/actions";
import checkLocal from "utils/checkLocal";
import reducerUtil from "utils/reducerUtil";
import storageData, { cookie, hostname } from "config/reducerData";

const cookiePrefix = "momentClient";
const prefixKey = (key: string) => `${cookiePrefix}-${key}`;

const startUp = (context: IContext) => async (dispatch: dispatch) => {
  const cookie = context.req.headers.cookie;
  const hostname = context.req.hostname;

  dispatch(reducerUtil.setSlice(storageData, storageData.cookie, cookie));
  dispatch(reducerUtil.setSlice(storageData, storageData.hostname, hostname));

  // other startup processes
  await dispatch(userActions.startUp());
};

const getCookieStorage = () => (dispatch, getState: getState) => {
  const cookie =
    typeof window != "undefined"
      ? undefined
      : reducerUtil.getSlice<cookie>(storageData, storageData.cookie, getState);
  const hostname =
    typeof window != "undefined"
      ? window.location.hostname
      : reducerUtil.getSlice<hostname>(storageData, storageData.hostname, getState);
  const local = checkLocal(hostname);

  const cookieProps = {
    path: "/",
    domain: local ? "localhost" : `.${hostname}`,
    secure: !local
  };

  const cookies = new Cookies(cookie);

  return {
    getItem: <T>(key: string) => {
      const myKey = prefixKey(key);
      const value =
        typeof window != "undefined" ? cookies.get(myKey) : cookies.get(encodeURIComponent(myKey));
      return value as T;
    },
    setItem: (key: string, value: unknown) => cookies.set(prefixKey(key), value, cookieProps),
    removeItem: (key: string) => cookies.remove(prefixKey(key), cookieProps),
    clear: () => {
      const list = Object.keys(cookies.getAll()).filter(key => key.startsWith(cookiePrefix));
      list.forEach(key => cookies.remove(key));
    }
  };
};

const redirectUrlKey = "redirectUrl";
const setRedirectUrl = (path: string) => (dispatch: dispatch) => {
  const storage = dispatch(getCookieStorage());
  storage.setItem(redirectUrlKey, path);
};

const getRedirectUrl = () => (dispatch: dispatch) => {
  const storage = dispatch(getCookieStorage());
  return storage.getItem<string>(redirectUrlKey);
};

export default { startUp, getCookieStorage, setRedirectUrl, getRedirectUrl };
