import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Image
					className={styles.logo}
					src='/next.svg'
					alt='Next.js logo'
					width={180}
					height={38}
					priority
				/>
				<ol>
					<li>
						Get started by editing <code>app/page.tsx</code>.
					</li>
					<li>Save and see your changes instantly.</li>
					Electric Car (Full Charge): 40 kWh Dryer (Tumble Dryer): 2–5 kWh Air
					Conditioner (4 hours): 4.8–10 kWh Electric Heater (5 hours): 5–12.5
					kWh Television (4 hours): 0.4–1.2 kWh Microwave (10 minutes):
					0.12–0.25 kWh Coffee Maker (Brewing): 0.1–0.375 kWh Electric Oven
					(Broiler, 30 minutes): 1–2 kWh Shower: 0.5–0.75 kWh (10 minutes) Bath:
					4.5–6.75 kWh (1.5 hours) Dishwasher: 1.5–2 kWh (1.5–2 hours) Vacuum
					Cleaner: 0.25–0.75 kWh (30 minutes) Washing Machine: 1–2 kWh (1–2
					hours) Oven: 2–3 kWh (1 hour)
				</ol>

				<div className={styles.ctas}>
					<a
						className={styles.primary}
						href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image
							className={styles.logo}
							src='/vercel.svg'
							alt='Vercel logomark'
							width={20}
							height={20}
						/>
						Deploy now
					</a>
					<a
						href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.secondary}
					>
						Read our docs
					</a>
				</div>
			</main>
			<footer className={styles.footer}>
				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image
						aria-hidden
						src='/file.svg'
						alt='File icon'
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image
						aria-hidden
						src='/window.svg'
						alt='Window icon'
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image
						aria-hidden
						src='/globe.svg'
						alt='Globe icon'
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
