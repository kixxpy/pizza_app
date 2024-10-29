import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginRespons } from '../interfaces/auth.interface';
import { Profile } from '../interfaces/user.interface';
import { RootState } from './store';
import { loadState } from './storege';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
	jwt: string | null;
	loginErrorMassage?: string;
	registerErrorMassage?: string;
	profile?: Profile;
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
export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string; name: string }) => {
		try {
			const { data } = await axios.post<LoginRespons>(
				`${PREFIX}/auth/register`,
				{
					email: params.email,
					password: params.password,
					name: params.name,
				}
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);
export const profile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/profile',
	async (_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
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
		clearErrorMesage: state => {
			state.loginErrorMassage = undefined;
		},
		clearRegisterErrorMesage: state => {
			state.registerErrorMassage = undefined;
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
		builder.addCase(profile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMassage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
