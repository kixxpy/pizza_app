import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginRespons } from '../interfaces/auth.interface';
import { loadState } from './storege';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
	jwt: string | null;
}
export interface userPersistentState {
	jwt: string | null;
}
const initialState: UserState = {
	jwt: loadState<userPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		const { data } = await axios.post<LoginRespons>(`${PREFIX}/auth/login`, {
			email: params.email,
			password: params.password,
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<LoginRespons>) => {
				state.jwt = action.payload.access_token;
			}
		);
	},
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
