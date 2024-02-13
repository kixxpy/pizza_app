import { Link } from 'react-router-dom';

export function Error() {
	return (
		<div>
			<div>Страница не найдена</div>
			<Link to='/'>Вернуться на главную</Link>
		</div>
	);
}
