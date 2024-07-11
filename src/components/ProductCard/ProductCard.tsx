import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
	return (
		<Link to={'/'} className={styles['cart-wrapper']}>
			<div className={styles['card']}>
				<div
					className={styles['head']}
					style={{ backgroundImage: `url('${props.image}')` }}
				>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
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
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;