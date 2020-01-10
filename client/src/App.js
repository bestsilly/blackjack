import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routers from "./router";

function App() {
  return (
    <Provider store={store}>
      <Routers/>
    </Provider>
  );
}

export default App;
