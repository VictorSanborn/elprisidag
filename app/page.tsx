'use client';

import ElomradeKarta from '@/components/swedenMap/page';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<section style={{ width: '100%' }}>
					<ElomradeKarta />
				</section>
			</main>
		</div>
	);
}
