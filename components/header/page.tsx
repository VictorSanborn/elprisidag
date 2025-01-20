'use client';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Elpris idag</h1>
			<FontAwesomeIcon icon={faBolt} className={styles.icon} />
		</header>
	);
}
