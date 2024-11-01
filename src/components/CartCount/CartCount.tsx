import cn from 'classnames';
import { CartCountpProps } from './CartCount.props';

function CartCount({ children, className, ...props }: CartCountpProps) {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	);
}

export default CartCount;
