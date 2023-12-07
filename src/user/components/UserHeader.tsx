import React from "react";
import styled from "styled-components";
import { BiCog, BiLogIn, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "utils/reduxHooks";
import { Button, ButtonLink, Tooltip } from "shared";
import reducerUtil from "utils/reducerUtil";
import userActions from "user/actions";
import storageActions from "storage/actions";
import userData, { user } from "user/reducerData";

const UserDiv = styled.div`
  display: flex;
  height: 2em;
  width: 4em;
  img {
    height: 100%;
    width: 100%;
    border-radius: 25%;
  }
  svg {
    height: 100%;
    width: 100%;
  }
  button {
    height: 100%;
    width: 100%;
  }
`;

const OptionsDiv = styled.div`
  width: 50%;
  flex-shrink: 0;
`;

const LogDiv = styled.div`
  flex-grow: 1;
`;

const OptionsLink = styled(ButtonLink)`
  width: 100%;
  height: 100%;
`;

const UserHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => reducerUtil.getSlice<user>(userData, userData.user, state));
  const { pathname } = useRouter();

  const image = user?.personal?.picture;

  const googleLogin = () => {
    dispatch(storageActions.setRedirectUrl(pathname));
    dispatch(userActions.googleLogin());
  };

  const logout = () => dispatch(userActions.logout());

  return (
    <UserDiv>
      <OptionsDiv>
        <Tooltip id="user-options" tooltip={"Click to see options"}>
          <OptionsLink href="/user">{image ? <img src={image} /> : <BiCog />}</OptionsLink>
        </Tooltip>
      </OptionsDiv>
      <LogDiv>
        {user ? (
          <Tooltip id="user-logout" tooltip={"Click to logout"}>
            <Button onClick={logout}>
              <BiLogOut />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip id="user-login" tooltip={"Click to login"}>
            <Button onClick={googleLogin}>
              <BiLogIn />
            </Button>
          </Tooltip>
        )}
      </LogDiv>
    </UserDiv>
  );
};

export default UserHeader;
