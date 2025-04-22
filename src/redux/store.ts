import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/admin.slice";
import { tenantApi } from "./apis/tenant.slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      // admin: adminSlice,
      [adminApi.reducerPath]: adminApi.reducer,
      [tenantApi.reducerPath]: tenantApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(adminApi.middleware)
        .concat(tenantApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
