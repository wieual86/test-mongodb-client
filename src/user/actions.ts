import { gql } from "@apollo/client";

import reducerUtil from "utils/reducerUtil";
import apiActions from "api/actions";
import userData, { user } from "user/reducerData";

const getUserCall = gql`
  query User {
    getUser {
      id
      name
      personal {
        email
        familyName
        givenName
        picture
      }
    }
  }
`;

const logoutCall = gql`
  mutation User {
    logout
  }
`;

const startUp = () => async (dispatch: dispatch) => {
  await dispatch(getUser());
};

type getUserResponse = { getUser: user };
const getUser = () => async (dispatch: dispatch) => {
  try {
    const {
      data: { getUser: user }
    } = await dispatch(apiActions.query<getUserResponse>(getUserCall, undefined, true));

    dispatch(reducerUtil.setSlice(userData, userData.user, user));
  } catch (error) {
    dispatch(reducerUtil.setSlice(userData, userData.user, undefined));
  }
};

const googleLogin = () => () => {
  window.location.assign(`${process.env.BACKEND_URL}/auth/google`);
};

type logoutResponse = { logout: boolean };
const logout = () => async (dispatch: dispatch) => {
  try {
    const {
      data: { logout: success }
    } = await dispatch(apiActions.mutate<logoutResponse>(logoutCall, undefined));

    if (success) dispatch(reducerUtil.setSlice(userData, userData.user, undefined));
  } catch (error) {
    // TODO
  }
};

export default {
  startUp,
  getUser,
  googleLogin,
  logout
};
