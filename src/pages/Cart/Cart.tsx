import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import Headling from '../../components/Headling/Headling';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { RootState } from '../../store/store';

export function Cart() {
	const [cartProducts, setCartProducts] = React.useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

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
	}, [items]);

	return (
		<>
			<Headling>Корзина</Headling>
			{cartProducts.length === 0 && <div>Добавте товары в корзину</div>}
			{items.map(i => {
				const product = cartProducts.find(p => p.id === p.id);
				if (!product) {
					return;
				}
				return <CartItem count={i.count} {...product} />;
			})}
		</>
	);
}
