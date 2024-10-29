import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { register, userAction } from '../../store/user.slice';
import styles from '../Login/Login.module.css';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

export function Register() {
	const navigete = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMassage } = useSelector((s: RootState) => s.user);

	React.useEffect(() => {
		if (jwt) {
			navigete('/');
		}
	}, [jwt, navigete]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userAction.clearRegisterErrorMesage());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		dispatch(
			register({
				email: email.value,
				password: password.value,
				name: name.value,
			})
		);
	};

	return (
		<>
			<div className={styles['login']}>
				<Headling>Вход</Headling>
				{registerErrorMassage && (
					<div className={styles['error']}>
						Неверный логин или пароль <div>{registerErrorMassage}</div>
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
					<div className={styles['field']}>
						<label htmlFor='password'>Ваше имя</label>
						<Input id='name' name='name' placeholder='Имя' />
					</div>
					<Button className={styles['btn']} appearence='big'>
						Зарегистрироваться
					</Button>
				</form>
				<div className={styles['links']}>
					<div>Есть акканут?</div>
					<Link to='/auth/login'>Войти</Link>
				</div>
			</div>
		</>
	);
}
