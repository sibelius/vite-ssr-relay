import React from "react";
import ReactDOMServer from "react-dom/server";
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

const { RelayEnvironmentProvider } = ReactRelay;

const environment = createEnvironment();

export async function render(req, res) {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  let router = createStaticRouter(handler.dataRoutes, context);

  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <StaticRouterProvider router={router} context={context} />
      </RelayEnvironmentProvider>
    </React.StrictMode>
  , {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        pipe(res);
      },
    });
}
