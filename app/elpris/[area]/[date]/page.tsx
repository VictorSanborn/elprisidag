import { sql } from '@vercel/postgres';
import AveragePriceExamples from './components/averagePriceExamples/page';
import PriceChart from './components/priceChart';
import styles from './page.module.css';

export default async function Home({
	params,
}: {
	params: { area: string; date: string };
}) {
	const { area, date } = await params;

	const today = new Date();
	const currentHour = today.getHours();

	// Om klockan är före 12:00, sätt datumet till igår
	if (currentHour < 12) {
		today.setDate(today.getDate() - 1); // Sätt datumet till igår
	}

	const queryDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

	const chartData = [];
	const euroPriceResponse =
		await sql`SELECT * FROM euroexchange WHERE date = ${queryDate}`;
	const euroPrice = euroPriceResponse.rows[0]?.eurtosekprice;
	const data =
		await sql`SELECT * FROM electricdailyprice WHERE eic = ${area} AND date = ${date}`;
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
						Nuvarande pris{' '}
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

				<p className={styles.info}>
					Snittpris: <span>{averagePrice.toFixed(2)}</span> kr/kWh
				</p>
				<section className={styles.chart}>
					<PriceChart dataSet={chartData} threshold={averagePrice} />
				</section>
				<AveragePriceExamples date={date} avaragePrice={averagePrice} />
			</main>
		</div>
	);
}
