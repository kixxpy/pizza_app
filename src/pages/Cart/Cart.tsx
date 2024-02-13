import { Link } from 'react-router-dom';

export function Cart() {
	return (
		<>
			Cart
			<div>
				<Link to='/'>Меню</Link>
				<Link to='/cart'>Корзина</Link>
			</div>
		</>
	);
}
