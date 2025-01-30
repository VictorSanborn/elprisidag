'use client';

import styles from './page.module.css';

export default function DayAreaPriceAverages({
	yesterdayAvgSE1,
	yesterdayAvgSE2,
	yesterdayAvgSE3,
	yesterdayAvgSE4,
	avgSE1,
	avgSE2,
	avgSE3,
	avgSE4,
	tomorrowAvgSE1,
	tomorrowAvgSE2,
	tomorrowAvgSE3,
	tomorrowAvgSE4,
}: {
	yesterdayAvgSE1: string;
	yesterdayAvgSE2: string;
	yesterdayAvgSE3: string;
	yesterdayAvgSE4: string;
	avgSE1: string;
	avgSE2: string;
	avgSE3: string;
	avgSE4: string;
	tomorrowAvgSE1: string;
	tomorrowAvgSE2: string;
	tomorrowAvgSE3: string;
	tomorrowAvgSE4: string;
}) {
	return (
		<section className={styles.dayAreaPriceAverages}>
			<section className={styles.averagePrices}>
				<h3>Dygns Snitt För:</h3>
				<span className={styles.prices}>
					<div className={styles.infoBox}>
						SE1
						<br />
						<div className={`${styles.notSelectedDay}`}>
							{yesterdayAvgSE1} kr/kWh
						</div>
						<span className={styles.selectedDay}>{avgSE1}</span> kr/kWh
						{tomorrowAvgSE1 ? (
							<div className={styles.notSelectedDay}>
								{tomorrowAvgSE1} kr/kWh
							</div>
						) : (
							<p className={styles.notSelectedDay}>kl 13</p>
						)}
					</div>
					<div className={styles.infoBox}>
						SE2
						<br />
						<div className={styles.notSelectedDay}>
							{yesterdayAvgSE2} kr/kWh
						</div>
						<span className={styles.selectedDay}>{avgSE2}</span> kr/kWh
						{tomorrowAvgSE2 ? (
							<div className={styles.notSelectedDay}>
								{tomorrowAvgSE2} kr/kWh
							</div>
						) : (
							<p className={styles.notSelectedDay}>kl 13</p>
						)}
					</div>
					<div className={styles.infoBox}>
						SE3
						<br />
						<div className={styles.notSelectedDay}>
							{yesterdayAvgSE3} kr/kWh
						</div>
						<span className={styles.selectedDay}>{avgSE3}</span> kr/kWh
						{tomorrowAvgSE3 ? (
							<div className={styles.notSelectedDay}>
								{tomorrowAvgSE3} kr/kWh
							</div>
						) : (
							<p className={styles.notSelectedDay}>kl 13</p>
						)}
					</div>
					<div className={styles.infoBox}>
						SE4
						<br />
						<div className={styles.notSelectedDay}>
							{yesterdayAvgSE4} kr/kWh
						</div>
						<span className={styles.selectedDay}>{avgSE4}</span> kr/kWh
						{tomorrowAvgSE4 ? (
							<div className={styles.notSelectedDay}>
								{tomorrowAvgSE4} kr/kWh
							</div>
						) : (
							<p className={styles.notSelectedDay}>kl 13</p>
						)}
					</div>
				</span>
			</section>
		</section>
	);
}
