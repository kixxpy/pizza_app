import { Link, Route, Routes } from 'react-router-dom';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Menu } from './pages/Menu/Menu';

function App() {
	return (
		<>
			<Button>I am button</Button>
			<Button appearence='big'>I am button</Button>
			<Input placeholder='Email' />
			<div>
				<Link to='/'>Меню</Link>
				<Link to='/cart'>Корзина</Link>
			</div>
			<Routes>
				<Route path='/' element={<Menu />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
