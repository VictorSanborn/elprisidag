import DayToShowToggler from '@/components/DayToShowToggler/page';
import { sql } from '@vercel/postgres';
import PriceChart from '../../../../components/priceChart';
import styles from './page.module.css';

export default async function Home({
	params,
}: {
	params: Promise<{ area: string; date: string }>;
}) {
	const { area, date } = await params;

	const today = new Date();
	const currentHour = today.getHours();

	let areaToUse = '';
	let dateToUse = date;

	if (area === 'se1') {
		areaToUse = '10Y1001A1001A44P';
	} else if (area === 'se2') {
		areaToUse = '10Y1001A1001A45N';
	} else if (area === 'se3') {
		areaToUse = '10Y1001A1001A46L';
	} else if (area === 'se4') {
		areaToUse = '10Y1001A1001A47J';
	}

	if (date === 'idag') {
		//Om datum är "idag" sätt datumet till dagens datum
		dateToUse = today.toISOString().split('T')[0];
	} else if (date === 'imorgon') {
		//Om datum är "imorgon" sätt datumet till dagens datum
		today.setDate(today.getDate() + 1);
		dateToUse = today.toISOString().split('T')[0];
		console.log(':D');
	} else {
		//Datum är antaglien i formatet YYYY-MM-DD, använd det datumet
	}

	// Om klockan är före 12:00, sätt datumet till igår
	if (currentHour < 12 || date === 'imorgon') {
		today.setDate(today.getDate() - 1); // Sätt datumet till igår
	}

	const queryDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

	const chartData = [];
	const euroPriceResponse =
		await sql`SELECT * FROM euroexchange WHERE date = ${queryDate}`;
	const euroPrice = euroPriceResponse.rows[0]?.eurtosekprice;
	const data =
		await sql`SELECT * FROM electricdailyprice WHERE eic = ${areaToUse} AND date = ${dateToUse}`;

	const AveragePricePerPriceArea = async (eic: string): Promise<string> => {
		const avgResponse =
			await sql`SELECT AVG(price) AS average_price FROM electricdailyprice WHERE eic = ${eic} AND date = ${dateToUse};`;

		const priceAvg = (avgResponse.rows[0]?.average_price * euroPrice) / 1000;
		return priceAvg.toFixed(2);
	};

	const avgSE1 = await AveragePricePerPriceArea('10Y1001A1001A44P');
	const avgSE2 = await AveragePricePerPriceArea('10Y1001A1001A45N');
	const avgSE3 = await AveragePricePerPriceArea('10Y1001A1001A46L');
	const avgSE4 = await AveragePricePerPriceArea('10Y1001A1001A47J');

	for (let i = 0; i < data.rows.length; i++) {
		chartData.push({
			hour: data.rows[i].hour,
			price: (data.rows[i].price * euroPrice) / 1000,
		});
	}

	const averagePrice =
		chartData.reduce((acc, item) => acc + item.price, 0) / chartData.length;

	let maxPrice = -9990.99;
	let minPrice = 9999.99;

	for (let i = 0; i < chartData.length; i++) {
		if (chartData[i].price > maxPrice) {
			maxPrice = chartData[i].price;
		}
		if (chartData[i].price < minPrice) {
			minPrice = chartData[i].price;
		}
	}

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<DayToShowToggler date={date} area={area} />
				{chartData.length > 0 ? (
					<section>
						<p className={styles.info}>{dateToUse}</p>
						<section className={styles.infoSection}>
							{date === 'idag' ? (
								<h3 className={styles.average}>
									<br />
									Nuvarande pris{' '}
									<span className={styles.currentPrice}>
										{chartData.map((data, index) =>
											currentHour + 1 == index ? data.price.toFixed(2) : null
										)}
									</span>{' '}
									SEK/kWh
								</h3>
							) : (
								<></>
							)}

							<section className={styles.prices}>
								<p className={styles.info}>
									Maxpris
									<br />
									<span>{maxPrice.toFixed(2)}</span> kr/kWh
								</p>
								<p className={styles.info}>
									Minpris
									<br />
									<span>{minPrice.toFixed(2)}</span> kr/kWh
								</p>
								<p className={styles.info}>
									Snittpris
									<br />
									<span>{averagePrice.toFixed(2)}</span> kr/kWh
								</p>
							</section>

							<p className={styles.info}>
								Alla priser på sidan avser spotpriset, inga andra avgifter, moms
								och skatter är tillagda
							</p>
						</section>
						<section className={styles.chart}>
							<PriceChart
								dataSet={chartData}
								threshold={averagePrice}
								currentHour={currentHour}
								showCurrentHour={date === 'idag'}
							/>
						</section>

						<section className={styles.averagePrices}>
							<h3>Dygns Snitt För:</h3>
							<span className={styles.prices}>
								<div className={styles.infoBox}>
									SE1
									<br />
									<span>{avgSE1}</span> kr/kWh
								</div>
								<div className={styles.infoBox}>
									SE2
									<br />
									<span>{avgSE2}</span> kr/kWh
								</div>
								<div className={styles.infoBox}>
									SE3
									<br />
									<span>{avgSE3}</span> kr/kWh
								</div>
								<div className={styles.infoBox}>
									SE4
									<br />
									<span>{avgSE4}</span> kr/kWh
								</div>
							</span>
						</section>
					</section>
				) : (
					<h2 className={styles.noData}>
						Nästa dags data kommer tidigast runt kl 13.
					</h2>
				)}
			</main>
		</div>
	);
}
