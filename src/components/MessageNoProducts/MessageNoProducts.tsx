import styles from './MessageNoProducts.module.css';

function MessageNoProducts() {
	return (
		<div className={styles['message-wrapper']}>
			<div className={styles['message']}>
				Не найдено блюдо по запросу <span>🥺</span>
			</div>
		</div>
	);
}

export default MessageNoProducts;
