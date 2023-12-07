import React from "react";
import { NextPageContext } from "next";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

declare global {
  type State = Record<string, Record<string, unknown>>;

  interface Action<T = unknown> extends AnyAction {
    type: string;
    payload: T;
  }

  type dispatch = ThunkDispatch<State, unknown, Action>;
  type getState = () => State;

  type baseProps<props = unknown> = React.PropsWithChildren<props>;

  interface IContext extends NextPageContext {
    req: NextPageContext["req"] & {
      hostname: string;
    };
    initialState: State;
  }

  interface IPageContext extends IContext {
    store: { dispatch: dispatch; getState: getState };
  }
}
