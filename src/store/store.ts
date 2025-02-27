import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import wishlistReducer from "./wishlistSlice"; // Import du wishlistSlice

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer, // Ajout de la wishlist au store
  },

  // Ajout des middleware par défaut (utile pour des middlewares additionnels)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Types pour le typage de l'état global et des dispatchs
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
