import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<section>
					<Link href='/elpris/e1/idag'>
						<div className={styles.areaSelection}>E1</div>
					</Link>
					<Link href='/elpris/e2/idag'>
						<div className={styles.areaSelection}>E2</div>
					</Link>
					<Link href='/elpris/e3/idag'>
						<div className={styles.areaSelection}>E3</div>
					</Link>
					<Link href='/elpris/e4/idag'>
						<div className={styles.areaSelection}>E4</div>
					</Link>
				</section>
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
