import axios, { AxiosError } from 'axios';
import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
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
	const [error, setError] = React.useState<string | null>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sentLogin(email.value, password.value);
	};

	const sentLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/login`, {
				email,
				password,
			});
			console.log(data);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<>
			<div className={styles['login']}>
				<Headling>Вход</Headling>
				{error && <div className={styles['error']}>{error}</div>}
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
