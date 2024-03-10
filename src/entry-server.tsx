import React from "react";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./routes.tsx";
import { createFetchRequest } from "./createFetchRequest.tsx";

let handler = createStaticHandler(routes);

import ReactRelay from "react-relay";
import { createEnvironment } from "../src/relay/relayEnvironment";
import { renderToPipeableStreamPromise } from './renderToPipeableStreamPromise';

const { RelayEnvironmentProvider } = ReactRelay;

const environment = createEnvironment();

export async function render(req, res) {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  let router = createStaticRouter(handler.dataRoutes, context);

  const tree = (<React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <StaticRouterProvider router={router} context={context} />
    </RelayEnvironmentProvider>
  </React.StrictMode>
  );

  const html = await renderToPipeableStreamPromise(tree);

  return {
    html,
  }
}
