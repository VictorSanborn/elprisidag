import { sql } from '@vercel/postgres';
import AveragePriceExamples from '../../../../components/averagePriceExamples/page';
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

	if (area === 'e1') {
		areaToUse = '10Y1001A1001A44P';
	} else if (area === 'e2') {
		areaToUse = '10Y1001A1001A45N';
	} else if (area === 'e3') {
		areaToUse = '10Y1001A1001A46L';
	} else if (area === 'e4') {
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
	console.log(
		`SELECT * FROM electricdailyprice WHERE eic = ${areaToUse} AND date = ${dateToUse}`
	);

	for (let i = 0; i < data.rows.length; i++) {
		chartData.push({
			hour: data.rows[i].hour,
			price: (data.rows[i].price * euroPrice) / 1000,
		});
	}

	const averagePrice =
		chartData.reduce((acc, item) => acc + item.price, 0) / chartData.length;

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<p className={styles.info}>
					Alla priser på sidan avser spotpriset, inga andra avgifter, moms och
					skatter är tillagda
				</p>

				{chartData.length > 0 ? (
					<h3 className={styles.average}>
						{dateToUse} Nuvarande pris{' '}
						<span>
							{chartData.map((data) =>
								data.hour == currentHour ? data.price.toFixed(2) : null
							)}
						</span>{' '}
						SEK/kWh
					</h3>
				) : (
					<h2 className={styles.average}>
						Nästa dags data kommer tidigast runt kl 13.
					</h2>
				)}
				<section>
					<div className={styles.dateToggler}>
						{' '}
						<a
							href={
								date === 'idag'
									? `/elpris/${area}/imorgon`
									: `/elpris/${area}/idag`
							}
						>
							Visa priserna för {date === 'idag' ? 'imorgon' : 'idag'}
						</a>
					</div>
				</section>
				<p className={styles.info}>
					Snittpris: <span>{averagePrice.toFixed(2)}</span> kr/kWh
				</p>
				<section className={styles.chart}>
					<PriceChart dataSet={chartData} threshold={averagePrice} />
				</section>
				<AveragePriceExamples dateToShow={date} averagePrice={averagePrice} />
			</main>
		</div>
	);
}
