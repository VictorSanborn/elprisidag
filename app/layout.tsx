import Footer from '@/components/footer/page';
import Header from '@/components/header/page';
import { Geist, Geist_Mono } from 'next/font/google';
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<script
					defer
					data-domain='dagensel.se'
					src='https://plausible.io/js/script.js'
				></script>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header />
				<section className='content'>{children}</section>
				<Footer />
			</body>
		</html>
	);
}
