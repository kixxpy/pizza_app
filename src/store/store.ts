import { configureStore } from '@reduxjs/toolkit';
import { CART_PERSISTENT_STATE, cartSlice } from './cart.slice';
import { saveState } from './storege';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice.reducer,
	},
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
	saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
