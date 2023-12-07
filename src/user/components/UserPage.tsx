import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "utils/reduxHooks";
import reducerUtil from "utils/reducerUtil";
import userActions from "user/actions";
import configActions from "config/actions";
import userData, { user } from "user/reducerData";

const StyledButton = styled.button`
  &:hover {
    color: ${({ theme }) => theme.hoverTextColor};
  }
`;

type buttonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ children, ...props }: baseProps<buttonProps>) => (
  <StyledButton type="button" {...props}>
    {children}
  </StyledButton>
);

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => reducerUtil.getSlice<user>(userData, userData.user, state));
  const { pathname } = useRouter();

  const image = user?.personal?.picture;

  const googleLogin = () => {
    dispatch(configActions.setRedirectUrl(pathname));
    dispatch(userActions.googleLogin());
  };

  const logout = () => dispatch(userActions.logout());

  return (
    <>
      {user ? (
        <>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={googleLogin}>Login</Button>
        </>
      )}
    </>
  );
};

export default UserPage;
