import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CartCount from '../../components/CartCount/CartCount';
import { AppDispatch, RootState } from '../../store/store';
import { profile, userAction } from '../../store/user.slice';
import styles from './Layout.module.css';

export function Layout() {
	const navigete = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const userPorfile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);
	const quantityItemCart = items.reduce((acc, item) => (acc += item.count), 0);

	React.useEffect(() => {
		dispatch(profile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userAction.logout());
		navigete('/auth/login');
	};
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<div className={styles['avatar']}>
						<img src='/avatar.png' alt='Аватар пользователя' />
					</div>
					<div className={styles['name']}>{userPorfile?.name}</div>
					<div className={styles['email']}>{userPorfile?.email}</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive,
							})
						}
					>
						<img src='/menu-icon.svg' alt='Иконка меню' />
						Меню
					</NavLink>

					<div className={styles['counting']}>
						<div>
							<NavLink
								to='/cart'
								className={({ isActive }) =>
									cn(styles['link'], {
										[styles.active]: isActive,
									})
								}
							>
								<img src='/cart-icon.svg' alt='Иконка корзины' />
								Корзина
							</NavLink>
						</div>
						<div
							className={cn(styles['count'], {
								[styles.nocount]: quantityItemCart <= 0,
							})}
						>
							{quantityItemCart ||
								(quantityItemCart > 0 && (
									<CartCount>
										{items.reduce((acc, item) => (acc += item.count), 0)}
									</CartCount>
								))}
						</div>
					</div>
				</div>
				<Button className={styles['exit']} onClick={logout}>
					<img src='/exit-icon.svg' alt='Иконка выхода' />
					Выйти
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
