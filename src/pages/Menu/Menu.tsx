import axios, { AxiosError } from 'axios';
import React, { ChangeEvent } from 'react';
import Headling from '../../components/Headling/Headling';
import MessageBlock from '../../components/MessageBlock/MessageBlock';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();
	const [filter, setFilter] = React.useState<string>();

	React.useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name,
				},
			});
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

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <div>Возникла ошибка - {error}</div>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <div>Загружаем продукты...</div>}
				{!isLoading && products.length === 0 && (
					<MessageBlock>
						К сожалению товар с таким названием не найден
					</MessageBlock>
				)}
			</div>
		</>
	);
}
export default Menu;
