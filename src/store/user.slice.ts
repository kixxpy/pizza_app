import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginRespons } from '../interfaces/auth.interface';
import { loadState } from './storege';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
	jwt: string | null;
	loginErrorMassage?: string;
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
		try {
			const { data } = await axios.post<LoginRespons>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password,
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null;
		},
		clearErrorMesage: state => {
			state.loginErrorMassage = undefined;
		},
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMassage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
