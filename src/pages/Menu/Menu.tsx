import axios, { AxiosError } from 'axios';
import React from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};
	React.useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				{error && <div>Возникла ошибка - {error}</div>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <div>Загружаем продукты...</div>}
			</div>
		</>
	);
}
