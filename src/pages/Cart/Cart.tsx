import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import Headling from '../../components/Headling/Headling';
import MessageBlock from '../../components/MessageBlock/MessageBlock';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { RootState } from '../../store/store';
import styles from './Cart.module.css';

export function Cart() {
	const [cartProducts, setCartProducts] = React.useState<Product[]>([]);
	const [isLoadind, setIsLoading] = React.useState<boolean>(true);
	const items = useSelector((s: RootState) => s.cart.items);

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
		</>
	);
}
