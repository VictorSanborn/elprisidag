import Link from 'next/link';
import styles from './page.module.css';

export default function DayToShowToggler({
	date,
	area,
}: {
	date: string;
	area: string;
}) {
	return (
		<section className={styles.dateToggler}>
			<Link
				href={
					date === 'idag' ? `/elpris/${area}/imorgon` : `/elpris/${area}/idag`
				}
			>
				<div className={styles.dateTogglerDay}>
					Visa priserna för {date === 'idag' ? 'imorgon' : 'idag'}
				</div>
			</Link>
		</section>
	);
}
