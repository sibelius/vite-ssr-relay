import { json, useLoaderData } from "react-router-dom";
import ReactRelay from "react-relay";
import { getPreloadedQuery } from './relay/getPreloadedQuery';
import AppQuery from "./__generated__/AppQuery.graphql";
import { App } from "./App";


export const routes = [
  {
    path: "/",
    async loader() {
      const rootQuery = await getPreloadedQuery(AppQuery, {});

      return json({
        rootQuery,
      });
    },
    Component: App,
  },
];
