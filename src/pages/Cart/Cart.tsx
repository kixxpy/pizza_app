import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CartItem from '../../components/CartItem/CartItem';
import Headling from '../../components/Headling/Headling';
import MessageBlock from '../../components/MessageBlock/MessageBlock';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { cartAction } from '../../store/cart.slice';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Cart.module.css';

export function Cart() {
	const [cartProducts, setCartProducts] = React.useState<Product[]>([]);
	const [isLoadind, setIsLoading] = React.useState<boolean>(true);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc = acc + i), 0);

	let delivery;
	if (total > 999) {
		delivery = 0;
	} else {
		delivery = 150;
	}

	setTimeout(() => {
		setIsLoading(false);
	}, 200);

	const getItem = async (id: number) => {
		const { data } = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};
	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCartProducts(res);
	};

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				product: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		dispatch(cartAction.clear());
		navigate('/success');
	};
	React.useEffect(() => {
		loadAllItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	return (
		<>
			<Headling className={styles['headling']}>Корзина</Headling>
			{isLoadind ||
				(cartProducts.length === 0 && (
					<MessageBlock>
						Ваша корзина пуста. Исправить это просто: выберите в каталоге
						интересующий товар и нажмите кнопку "В корзину"
					</MessageBlock>
				))}
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={i.id} count={i.count} {...product} />;
			})}
			<div className={styles['priceCart']}>
				<div className={styles['text']}>
					Итог
					<div className={styles['price']}>
						{total} <span className={styles['rubsymbol']}>₽</span>
					</div>
				</div>
				<hr className={styles['hr']} />
				<div className={styles['indentation']}>
					<div className={styles['text']}>
						Достовка
						<div>
							{delivery} <span className={styles['rubsymbol']}>₽</span>
						</div>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['text']}>
						Итог ({items.length})
						<div>
							{total && total + delivery}
							<span className={styles['rubsymbol']}>₽</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles['checkout']}>
				<Button onClick={checkout} className={styles['btn']} appearence='big'>
					Оформить
				</Button>
			</div>
		</>
	);
}
