import { configureStore } from "@reduxjs/toolkit";

import monitorReducersEnhancer from "./middleware/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import rootReducer from "./index.js";

export default function configureAppStore(preloadedState) {
  const middleware = [];
  if (process.env.NODE_ENV !== "production") {
    middleware.push(loggerMiddleware);
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...middleware,
    ],
    preloadedState,
    enhancers: [monitorReducersEnhancer],
  });

  //   if (process.env.NODE_ENV !== "production" && module.hot) {
  //     module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  //   }

  return store;
}
