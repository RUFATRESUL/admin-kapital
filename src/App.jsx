import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "src/redux/store";
import Router from "./pages";
import SpinnerLarg from "./shared/components/SpinnerLarg/SpinnerLarg";

function App() {
  let persistor = persistStore(store);

  let loader = (
    <div className="h-100vh d-flex justify-content-center align-items-center">
      <div>
        <SpinnerLarg color="blue" />
      </div>
    </div>
  );
  return (
    <Provider store={store}>
      <PersistGate loading={loader} persistor={persistor}>
        <HashRouter>
          <Router />
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
