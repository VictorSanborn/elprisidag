import Footer from '@/components/footer/page';
import Header from '@/components/header/page';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import './lib/fontawesome';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Dagens El',
	description: 'Dagens elpriser i Sverige',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Head>
				<script
					defer
					data-domain='dagensel.se'
					src='https://plausible.io/js/script.js'
				></script>
			</Head>
			<html lang='en'>
				<body className={`${geistSans.variable} ${geistMono.variable}`}>
					<Header />
					<section className='content'>{children}</section>
					<Footer />
				</body>
			</html>
		</>
	);
}
