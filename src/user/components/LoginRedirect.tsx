import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "utils/reduxHooks";
import configActions from "config/actions";

const LoginRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = dispatch(configActions.getRedirectUrl());

  useEffect(() => {
    router.push(path || "/");
  });

  return <div />;
};

export default LoginRedirect;
