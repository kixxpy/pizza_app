import axios from 'axios';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { PREFIX } from './helpers/API.ts';
import './index.css';
import { Layout } from './layout/Layout/Layout.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Products } from './pages/Poduct/Product.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={'Загрузка...'}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/product/:id',
				element: <Products />,
				errorElement: <div>Ошибка</div>,
				loader: async ({ params }) => {
					return defer({
						data: axios
							.get(`${PREFIX}/products/${params.id}`)
							.then(data => data),
					});
				},
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
