import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

export function Products() {
	const data = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => <>Porduct - {data.name}</>}
				</Await>
			</Suspense>
		</>
	);
}
