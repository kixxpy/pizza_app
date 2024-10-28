import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { login, userAction } from '../../store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const navigete = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loginErrorMassage, jwt } = useSelector((s: RootState) => s.user);

	React.useEffect(() => {
		if (jwt) {
			navigete('/');
		}
	}, [jwt, navigete]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userAction.clearErrorMesage());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sentLogin(email.value, password.value);
	};

	const sentLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
		// try {
		// 	const { data } = await axios.post<LoginRespons>(`${PREFIX}/auth/login`, {
		// 		email,
		// 		password,
		// 	});
		// 	dispatch(userAction.addJwt(data.access_token));
		// 	navigete('/');
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		setError(e.response?.data.message);
		// 	}
		// }
	};

	return (
		<>
			<div className={styles['login']}>
				<Headling>Вход</Headling>
				{loginErrorMassage && (
					<div className={styles['error']}>
						Неверный логин или пароль <div>{loginErrorMassage}</div>
					</div>
				)}
				<form className={styles['form']} onSubmit={submit}>
					<div className={styles['field']}>
						<label htmlFor='email'>Ваш email</label>
						<Input id='email' name='email' placeholder='Email' />
					</div>
					<div className={styles['field']}>
						<label htmlFor='password'>Ваш пароль</label>
						<Input
							id='password'
							type='password'
							name='password'
							placeholder='Пароль'
						/>
					</div>
					<Button className={styles['btn']} appearence='big'>
						Вход
					</Button>
				</form>
				<div className={styles['links']}>
					<div>Нет аккаунта?</div>
					<Link to='/auth/register'>Зарегистрироваться</Link>
				</div>
			</div>
		</>
	);
}
