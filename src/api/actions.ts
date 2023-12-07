import "cross-fetch/polyfill";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  FetchPolicy,
  DocumentNode,
  TypedDocumentNode
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { withScalars } from "apollo-link-scalars";

import reducerUtil from "utils/reducerUtil";
import storageData, { cookie } from "config/reducerData";
import { schema } from "api/utils";

// types
type MutateOps = { context?: { headers: { cookie: string } } };
type QueryOps = MutateOps & { fetchPolicy?: FetchPolicy };

type query = DocumentNode | TypedDocumentNode;

// client
const client = new ApolloClient({
  link: ApolloLink.from([
    withScalars({ schema }),
    new BatchHttpLink({ uri: `${process.env.BACKEND_URL}/graphql`, credentials: "include" })
  ]),
  cache: new InMemoryCache(),
  credentials: "include"
});

const getRequestOptions = (ignoreCache?: boolean) => (dispatch: dispatch, getState: getState) => {
  const requestOptions: QueryOps = {};
  if (typeof window === "undefined" || ignoreCache) requestOptions.fetchPolicy = "network-only";
  if (typeof window === "undefined") {
    const cookie = reducerUtil.getSlice<cookie>(storageData, storageData.cookie, getState);
    requestOptions.context = { headers: { cookie } };
  }
  return requestOptions;
};

const query =
  <T, V = unknown>(query: query, variables?: V, ignoreCache?: boolean) =>
  (dispatch: dispatch) => {
    const requestOptions = dispatch(getRequestOptions(ignoreCache));
    return client.query<T>({ query, variables, ...requestOptions });
  };

const mutate =
  <T, V = unknown>(query: query, variables?: V) =>
  (dispatch: dispatch) => {
    const requestOptions = dispatch(getRequestOptions()) as MutateOps;
    return client.mutate<T>({ mutation: query, variables, ...requestOptions });
  };

export default { query, mutate };
