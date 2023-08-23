import React from "react";
import ReactDOM from "react-dom/client";
import * as i18n from "i18n/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "apollo/provider";
import { store } from "redux/store";
import { Provider } from "react-redux";
import "./index.css";

import Home from "pages/Home";
import PlayerDetail from "pages/PlayerDetail";
import Error from "pages/Error";

i18n.initialize("en");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/player/:id",
    element: <PlayerDetail />,
  },
]);

root.render(
  <React.StrictMode>
    <ApolloProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
