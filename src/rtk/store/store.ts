import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import productApi from '../../services/product.service'
import authApi from '../../services/auth.service'
import categoryApi from '../../services/category.service'
import { createProductSlice } from '../slice/product-slice'
import variantApi from '../../services/variant.service'
import cartApi from '../../services/cart.service'
import addressApi from '../../services/address.service'
import paymentApi from '../../services/payment.service'
import orderApi from '../../services/order.service'

export const store = configureStore({
  reducer: {
    product: createProductSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(authApi.middleware)
    .concat(categoryApi.middleware)
    .concat(variantApi.middleware)
    .concat(cartApi.middleware)
    .concat(addressApi.middleware)
    .concat(paymentApi.middleware)
    .concat(orderApi.middleware)
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch