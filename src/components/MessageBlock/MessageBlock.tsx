import cn from 'classnames';
import styles from './MessageBlock.module.css';
import { MessageBlockProps } from './MessageBlock.props';

function MessageBlock({ children, className, ...props }: MessageBlockProps) {
	return (
		<div className={cn(className, styles['wrapper'])} {...props}>
			<div className={styles['message']}>{children}</div>
		</div>
	);
}

export default MessageBlock;
