import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storege';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
	},
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
