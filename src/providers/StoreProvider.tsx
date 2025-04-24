// "use client";

import LoadingPage from "@/app/loading";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
 
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div><LoadingPage /></div>}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
