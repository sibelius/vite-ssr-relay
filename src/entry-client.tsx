import './index.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './routes.tsx';

let router = createBrowserRouter(routes);

import ReactRelay from 'react-relay';
import { createEnvironment } from '../src/relay/relayEnvironment';

const { RelayEnvironmentProvider } = ReactRelay;

const environment = createEnvironment();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<span>Loading</span>}>
        <RouterProvider router={router} />
      </Suspense>
    </RelayEnvironmentProvider>
  </React.StrictMode>
)
