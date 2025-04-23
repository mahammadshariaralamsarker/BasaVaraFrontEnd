// "use client";

import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading persisted state...</div>}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
