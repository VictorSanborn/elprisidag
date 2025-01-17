'use client';

import {
	faBath,
	faCar,
	faMugHot,
	faPersonShelter,
	faShirt,
	faShower,
	faTv,
	faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';

export default function AveragePriceExamples({
	dateToShow,
	averagePrice,
}: {
	dateToShow: string;
	averagePrice: number;
}) {
	const examples = [
		{
			icon: faCar,
			title: 'Ladda elbilen',
			price: (averagePrice * 40).toFixed(1),
			calculation: 'ca 40 kWh',
		},
		{
			icon: faShirt,
			title: 'Köra torktummlaren',
			price: (averagePrice * 4).toFixed(1),
			calculation: 'ca 2–5 kWh ',
		},
		{
			icon: faShirt,
			title: 'Köra ten tvättmaskin',
			price: (averagePrice * 2).toFixed(1),
			calculation: 'ca 1–2 kWh (1 timme)',
		},
		{
			icon: faShower,
			title: 'Duscha',
			price: (averagePrice * 0.75).toFixed(1),
			calculation: 'ca 0,75 kWh (10 minuter)',
		},
		{
			icon: faBath,
			title: 'Bada',
			price: (averagePrice * 2).toFixed(1),
			calculation: 'ca 2 kWh (1,5 timmar)',
		},
		{
			icon: faUtensils,
			title: 'Diskmaskin',
			price: (averagePrice * (2 * 1.5)).toFixed(1),
			calculation: 'ca 2 kWh (1,5 timmar)',
		},
		{
			icon: faTv,
			title: 'Titta på TV',
			price: (averagePrice * 1).toFixed(1),
			calculation: 'ca 1 kWh (4 timmar)',
		},
		{
			icon: faPersonShelter,
			title: 'Elektriskt element/AC',
			price: (averagePrice * 2).toFixed(1),
			calculation: 'ca 2kWh (1 timme)',
		},
		{
			icon: faMugHot,
			title: 'Brygga kaffe',
			price: (averagePrice * 0.3).toFixed(1),
			calculation: 'ca 0,3kWh för en kanna',
		},
	];

	return (
		<section className={styles.averagePriceExamples}>
			<h3 className={styles.h3}>Med priset {dateToShow} kostar:</h3>

			<section className={styles.gridContainer}>
				{examples.map((example, index) => (
					<div className={styles.infoBox} key={`price-example-${index}`}>
						<FontAwesomeIcon icon={example.icon} className={styles.icon} />
						<div className={styles.info}>
							<p className={styles.title}>{example.title}</p>
							<p>
								<b>{example.price} Sek</b>
							</p>
							<p className={styles.calculation}>{example.calculation}</p>
						</div>
					</div>
				))}
			</section>
		</section>
	);
}
