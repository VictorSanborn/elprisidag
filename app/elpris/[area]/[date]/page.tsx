import DayAreaPriceAverages from '@/components/DayAreaPriceAverages/page';
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
	let tomorrow = null;
	const currentHour = today.getHours();

	let eic = '';
	let dateToUse = date;

	if (area === 'se1') {
		eic = '10Y1001A1001A44P';
	} else if (area === 'se2') {
		eic = '10Y1001A1001A45N';
	} else if (area === 'se3') {
		eic = '10Y1001A1001A46L';
	} else if (area === 'se4') {
		eic = '10Y1001A1001A47J';
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

	// Om klockan är före 04:00, sätt datumet till igår
	if (currentHour < 4 || date === 'imorgon') {
		today.setDate(today.getDate() - 1); // Sätt datumet till igår
	}

	if (currentHour > 13) {
		tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1); // Sätt datumet till imorgon
		tomorrow = tomorrow.toISOString().split('T')[0];
	}

	const queryDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

	const chartData = [];
	const euroPriceResponse =
		await sql`SELECT * FROM euroexchange WHERE date = ${queryDate}`;
	const euroPrice = euroPriceResponse.rows[0]?.eurtosekprice;

	// Hämta data för valt datum
	const data =
		await sql`SELECT * FROM electricdailyprice WHERE eic = ${eic} AND date = ${dateToUse}`;

	// Hämta data för dagen innan
	const yesterday = new Date(dateToUse);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayDateToUse = yesterday.toISOString().split('T')[0];

	const yesterdayEuroPriceResponse =
		await sql`SELECT * FROM euroexchange WHERE date = ${yesterdayDateToUse}`;
	const yesterdayEuroPrice = yesterdayEuroPriceResponse.rows[0]?.eurtosekprice;

	console.log('yesterdayDateToUse', yesterdayDateToUse, yesterdayEuroPrice);

	const AveragePricePerPriceArea = async (
		eic: string,
		daysEuroPrice: number,
		date: string
	): Promise<string> => {
		const avgResponse =
			await sql`SELECT AVG(price) AS average_price FROM electricdailyprice WHERE eic = ${eic} AND date = ${date};`;

		console.log(
			'avgResponse',
			avgResponse.rows[0]?.average_price,
			daysEuroPrice
		);

		const priceAvg =
			(avgResponse.rows[0]?.average_price * daysEuroPrice) / 1000;
		return priceAvg.toFixed(2);
	};

	//Todays average price
	const avgSE1 = await AveragePricePerPriceArea(
		'10Y1001A1001A44P',
		euroPrice,
		dateToUse
	);
	const avgSE2 = await AveragePricePerPriceArea(
		'10Y1001A1001A45N',
		euroPrice,
		dateToUse
	);
	const avgSE3 = await AveragePricePerPriceArea(
		'10Y1001A1001A46L',
		euroPrice,
		dateToUse
	);
	const avgSE4 = await AveragePricePerPriceArea(
		'10Y1001A1001A47J',
		euroPrice,
		dateToUse
	);

	//Yesterdays avaerage price
	const yesterdayAvgSE1 = await AveragePricePerPriceArea(
		'10Y1001A1001A44P',
		yesterdayEuroPrice,
		yesterdayDateToUse
	);
	const yesterdayAvgSE2 = await AveragePricePerPriceArea(
		'10Y1001A1001A45N',
		yesterdayEuroPrice,
		yesterdayDateToUse
	);
	const yesterdayAvgSE3 = await AveragePricePerPriceArea(
		'10Y1001A1001A46L',
		yesterdayEuroPrice,
		yesterdayDateToUse
	);
	const yesterdayAvgSE4 = await AveragePricePerPriceArea(
		'10Y1001A1001A47J',
		yesterdayEuroPrice,
		yesterdayDateToUse
	);

	//Tomomrrow's average price (if time after 13:00)
	let tomorrowAvgSE1 = null;
	let tomorrowAvgSE2 = null;
	let tomorrowAvgSE3 = null;
	let tomorrowAvgSE4 = null;
	if (tomorrow) {
		tomorrowAvgSE1 = await AveragePricePerPriceArea(
			'10Y1001A1001A44P',
			euroPrice,
			dateToUse
		);
		tomorrowAvgSE2 = await AveragePricePerPriceArea(
			'10Y1001A1001A45N',
			euroPrice,
			dateToUse
		);
		tomorrowAvgSE3 = await AveragePricePerPriceArea(
			'10Y1001A1001A46L',
			euroPrice,
			dateToUse
		);
		tomorrowAvgSE4 = await AveragePricePerPriceArea(
			'10Y1001A1001A47J',
			euroPrice,
			dateToUse
		);
	}

	//Insert data for chart
	for (let i = 0; i < data.rows.length; i++) {
		chartData.push({
			hour: data.rows[i].hour,
			price: (data.rows[i].price * euroPrice) / 1000,
		});
	}

	//Find max and min price
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
									<span>
										{area == 'se1' ? avgSE1 : null}
										{area == 'se2' ? avgSE2 : null}
										{area == 'se3' ? avgSE3 : null}
										{area == 'se4' ? avgSE4 : null}
									</span>{' '}
									kr/kWh
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
								threshold={
									area == 'se1'
										? parseFloat(avgSE1)
										: area == 'se2'
										? parseFloat(avgSE2)
										: area == 'se3'
										? parseFloat(avgSE3)
										: parseFloat(avgSE4)
								}
								currentHour={currentHour}
								showCurrentHour={date === 'idag'}
							/>
						</section>
						<DayAreaPriceAverages
							yesterdayAvgSE1={yesterdayAvgSE1}
							yesterdayAvgSE2={yesterdayAvgSE2}
							yesterdayAvgSE3={yesterdayAvgSE3}
							yesterdayAvgSE4={yesterdayAvgSE4}
							avgSE1={avgSE1}
							avgSE2={avgSE2}
							avgSE3={avgSE3}
							avgSE4={avgSE4}
							tomorrowAvgSE1={tomorrowAvgSE1 ? tomorrowAvgSE1 : ''}
							tomorrowAvgSE2={tomorrowAvgSE2 ? tomorrowAvgSE2 : ''}
							tomorrowAvgSE3={tomorrowAvgSE3 ? tomorrowAvgSE3 : ''}
							tomorrowAvgSE4={tomorrowAvgSE4 ? tomorrowAvgSE4 : ''}
						/>
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
