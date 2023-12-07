import React from "react";
import { Provider } from "react-redux";
import App, { AppContext } from "next/app";

import initializeStore from "store";
import configActions from "config/actions";
import GlobalStyle, { Theme } from "shared";
import MainLayout from "layout";

type props = {
  Component: (() => JSX.Element) & { Layout: () => JSX.Element };
  initialState: State;
  pageProps: {};
};

const MyApp = ({ Component, initialState, pageProps }: props) => {
  const store = initializeStore(initialState);
  const Layout = Component.Layout || MainLayout;
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </Provider>
  );
};

MyApp.getInitialProps = async ({ ctx: context, ...appContext }: AppContext) => {
  const { initialState } = context as IContext;
  const store = initializeStore(initialState);
  const ctx = { ...context, store };

  if (typeof window === "undefined") {
    await Promise.all([
      store.dispatch(configActions.startUp(context as IContext)),
      App.getInitialProps({ ...appContext, ctx })
    ]);
  } else {
    await App.getInitialProps({ ...appContext, ctx });
  }

  return { pageProps: {}, initialState: store.getState() };
};

export default MyApp;
