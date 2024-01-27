import { json, useLoaderData } from "react-router-dom";
import ReactRelay from "react-relay";
import { getPreloadedQuery } from './relay/getPreloadedQuery.tsx';
import routesQuery from "./__generated__/routesQuery.graphql.ts";

const { usePreloadedQuery, PreloadedQuery, graphql, useRelayEnvironment } =
  ReactRelay;

export const App = () => {
  const loaderData = useLoaderData();

  const environment = useRelayEnvironment();

  const queryId =
    loaderData.rootQuery.params.id || loaderData.rootQuery.params.text;
  const params = loaderData.rootQuery.params;
  const variables = loaderData.rootQuery.variables;

  const rootQuery = {
    environment,
    fetchKey: queryId,
    fetchPolicy: "store-or-network",
    isDisposed: false,
    name: params.name,
    kind: "PreloadedQuery",
    variables,
  };

  const data = usePreloadedQuery(
    graphql`
      query routesQuery {
        version
      }
    `,
    rootQuery
  );
  console.log('app: ', {
    data,
  });

  return <h1>version: {data.version}</h1>;
};

export const routes = [
  {
    path: "/",
    async loader() {
      const rootQuery = await getPreloadedQuery(routesQuery, {});

      return json({
        rootQuery,
      });
    },
    Component: App,
  },
];
