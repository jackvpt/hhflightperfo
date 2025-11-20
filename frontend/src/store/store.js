// 📦 Redux Toolkit imports
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

// 🗃️ Feature slices
import weatherDataSlice from "../features/weatherDataSlice" // import weatherData slice
import flightDataSlice from "../features/flightDataSlice" // import flightData slice
import performancesSlice from "../features/performancesSlice" // import performances slice
import { calculatePerformances } from "../store/action.js"

/**
 * 🧱 Root reducer combining all slices.
 */
const rootReducer = combineReducers({
  weatherData: weatherDataSlice,
  flightData: flightDataSlice,
  performancesData: performancesSlice,
})

/**
 * ⚙️ Root persist configuration.
 *
 * Controls which top-level slices are persisted.
 */
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["weatherData", "flightData", "performancesData"], // only these slices are persisted
}

/**
 * 🧠 Create the global persisted reducer.
 */
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

/**
 * 🏗️ Configure Redux store using Redux Toolkit.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ignore redux-persist warnings
    }),
})

/**
 * 💾 Create persistor instance to enable store persistence.
 */
export const persistor = persistStore(store, null, () => {
  store.dispatch(calculatePerformances())
}) // Recalculate performances after rehydration
