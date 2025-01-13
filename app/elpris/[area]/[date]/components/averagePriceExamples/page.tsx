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

export default function AveragePriceExamples(props: {
	date: string;
	avaragePrice: number;
}) {
	const examples = [
		{
			icon: faCar,
			title: 'Ladda elbilen',
			price: (props.avaragePrice * 40).toFixed(1),
			calculation: 'ca 40 kwh',
		},
		{
			icon: faShirt,
			title: 'Köra torktummlaren',
			price: (props.avaragePrice * 4).toFixed(1),
			calculation: 'ca 2–5 kWh ',
		},
		{
			icon: faShirt,
			title: 'Köra ten tvättmaskin',
			price: (props.avaragePrice * 2).toFixed(1),
			calculation: 'ca 1–2 kWh (1 timme)',
		},
		{
			icon: faShower,
			title: 'Duscha',
			price: (props.avaragePrice * 0.75).toFixed(1),
			calculation: 'ca 0,75 kWh (10 minuter)',
		},
		{
			icon: faBath,
			title: 'Bada',
			price: (props.avaragePrice * 2).toFixed(1),
			calculation: 'ca 2 kWh (1,5 timmar)',
		},
		{
			icon: faUtensils,
			title: 'Diskmaskin',
			price: (props.avaragePrice * (2 * 1.5)).toFixed(1),
			calculation: 'ca 2 kWh (1,5 timmar)',
		},
		{
			icon: faTv,
			title: 'Titta på TV',
			price: (props.avaragePrice * 1).toFixed(1),
			calculation: 'ca 1 kWh (4 timmar)',
		},
		{
			icon: faPersonShelter,
			title: 'Elektriskt element/AC',
			price: (props.avaragePrice * 2).toFixed(1),
			calculation: 'ca 2w (1 timme)',
		},
		{
			icon: faMugHot,
			title: 'Brygga kaffe',
			price: (props.avaragePrice * 0.3).toFixed(1),
			calculation: 'ca 0,3kwh för en kanna',
		},
	];

	return (
		<section className={styles.averagePriceExamples}>
			<h3 className={styles.h3}>Med priset {props.date} kostar:</h3>

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
