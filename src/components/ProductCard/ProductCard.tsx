import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAction } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: React.MouseEvent): void => {
		e.preventDefault();
		dispatch(cartAction.addToCart(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} className={styles['cart-wrapper']}>
			<div className={styles['card']}>
				<div
					className={styles['head']}
					style={{
						backgroundImage: `url('${props.image}')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src='/cart-product-icon.svg' alt='Иконка корзины' />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img
							className={styles['star']}
							src='/star-icon.svg'
							alt='Иконка звездочки'
						/>
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
