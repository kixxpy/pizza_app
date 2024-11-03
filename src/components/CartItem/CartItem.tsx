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
	const descrease = (): void => {};
	const remove = (): void => {};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{
					backgroundImage: `url('${props.image}')`,
				}}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['currency']}>{props.price}&nbsp;</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={descrease}>
					<img src='/cart-product-icon.svg' alt='Удалить из корзины' />
				</button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['buttom']} onClick={increase}>
					<img src='/cart-product-icon.svg' alt='Добавить в корзину' />
				</button>
			</div>
			<button className={styles['remove']} onClick={remove}>
				<img src='/cart-product-icon.svg' alt='Удалить все' />
			</button>
		</div>
	);
}

export default CartItem;
