import React from "react";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Hello</h1>
      </div>
    </Provider>
  );
}

export default App;
