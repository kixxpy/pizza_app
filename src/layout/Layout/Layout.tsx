import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<div className={styles['avatar']}>
						<img src='/avatar.png' alt='Аватар пользователя' />
					</div>
					<div className={styles['name']}>Вася Пупкин</div>
					<div className={styles['email']}>ekn62@bk.ru</div>
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
				<Button className={styles['exit']}>
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
