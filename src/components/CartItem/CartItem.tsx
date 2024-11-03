import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (): void => {
		dispatch(cartAction.addToCart(props.id));
	};
	const descrease = (): void => {
		dispatch(cartAction.remove(props.id));
	};
	const remove = (): void => {
		dispatch(cartAction.delite(props.id));
	};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price} ₽&nbsp;</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={descrease}>
					<img src='/minus-icon.svg' alt='Удалить из корзины' />
				</button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src='/plus-icon.svg' alt='Добавить в корзину' />
				</button>
				<button className={styles['delite']} onClick={remove}>
					<img src='/delite-icon.svg' alt='Удалить все' />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
