import { json, useLoaderData } from "react-router-dom";
import ReactRelay from "react-relay";

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
      query AppQuery {
        version
      }
    `,
    rootQuery
  );

  return <h1>version: {data.version}</h1>
}
