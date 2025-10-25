// 📦 Redux Toolkit imports
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer, createTransform } from "redux-persist"
import storage from "redux-persist/lib/storage"

// 🗃️ Feature slices
import parametersSlice, {
  initialState as parametersInitialState,
} from "../features/parametersSlice"
import weatherDataSlice from "../features/weatherDataSlice" // import weatherData slice
import flightDataSlice from "../features/flightDataSlice" // import flightData slice
import performancesSlice from "../features/performancesSlice" // import performances slice

/**
 * 🎯 Transform for the 'parameters' slice.
 *
 * Only selected keys will be persisted.
 * Non-persisted fields (like temporary UI state) will be reset
 * to their initialState after a refresh.
 */
const parametersTransform = createTransform(
  // ➡️ Transform before saving to storage
  (inboundState) => ({
    bankAccount: inboundState.bankAccount,
    isTransactionEditWindowVisible: inboundState.isTransactionEditWindowVisible,
    isRecurringEditWindowVisible: inboundState.isRecurringEditWindowVisible,
    isCheckTransactionsEditWindowVisible:
      inboundState.isCheckTransactionsEditWindowVisible,
    transactionsTableScrollPosition:
      inboundState.transactionsTableScrollPosition,
  }),

  // ⬅️ Transform after rehydration
  (outboundState) => ({
    ...parametersInitialState, // restore all non-persisted fields
    ...outboundState, // overwrite persisted fields
  }),

  // Apply this transform only to the 'parameters' slice
  { whitelist: ["parameters"] }
)

/**
 * 🧱 Root reducer combining all slices.
 */
const rootReducer = combineReducers({
  parameters: parametersSlice, // partial persistence controlled via transform
  weatherData: weatherDataSlice,
  flightData: flightDataSlice,
  performancesData: performancesSlice,
  // add weatherData slice
})

/**
 * ⚙️ Root persist configuration.
 *
 * Controls which top-level slices are persisted.
 */
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["weatherData", "flightData", "performancesData", "parameters"], // only these slices are persisted
  transforms: [parametersTransform], // apply selective transform
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
export const persistor = persistStore(store)
