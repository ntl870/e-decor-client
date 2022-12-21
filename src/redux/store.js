import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import shopReducer from "./shopRedux";
import productReducer from "./productRedux";
import categoryReducer from "./categoryRedux";
import addressReducer from "./addressRedux";
import wishlistReducer from "./wishlistRedux";
import feedbackReducer from "./feedbackRedux";
import promotionReducer from "./promotionRedux";
import orderReducer from "./orderRedux";
import shipmentReducer from "./shipmentRedux";
import filterReducer from "./filterRedux";
import statisticReducer from "./statisticRedux";
import blogReducer from "./blogRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // whitelist: ['user']
  blacklist: ['order']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  shop: shopReducer,
  address: addressReducer,
  product: productReducer,
  category: categoryReducer,
  wishlist: wishlistReducer,
  feedback: feedbackReducer,
  promotion: promotionReducer,
  order: orderReducer,
  shipment: shipmentReducer,
  filter: filterReducer,
  statistic: statisticReducer,
  blog: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
