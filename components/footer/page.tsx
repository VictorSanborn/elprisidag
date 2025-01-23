'use client';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './page.module.css';
export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Link href='/'>
				<var className={styles.logo}>
					<h1 className={styles.title}>Dagens El</h1>
					<div className={styles.icon}>
						<FontAwesomeIcon icon={faBolt} />
					</div>
				</var>
			</Link>
		</footer>
	);
}
