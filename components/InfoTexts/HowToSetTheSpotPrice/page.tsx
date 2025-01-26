import styles from './page.module.css';
export default function HowToSetTheSpotPrice() {
	return (
		<section className={styles.howToSetTheSpotPrice}>
			<b>Hur sätts elpriset i Sverige?</b>
			<br />
			<br />
			Elpriset i de fyra elområdena (SE1–SE4) bestäms på den nordiska elbörsen
			Nord Pool. Priset avgörs av kostnaden för att producera den sista
			kilowattimmen (kWh) som behövs för att möta efterfrågan. Detta så kallade
			spotpris gäller för hela den aktuella timmen.
			<br />
			<br />
			Elproducenter börjar med de billigaste produktionssätten, som vindkraft,
			vattenkraft och kärnkraft. Om efterfrågan är högre än vad dessa kan
			leverera, används dyrare alternativ – i värsta fall fossil elproduktion.
			<br />
			<br />
			Elbörsens två delar Nord Pool består av två marknader:
			<br />
			<ul>
				<li>
					<b>Day-ahead Market (Elspot):</b> Här sätts elpriset upp till 36
					timmar i förväg, baserat på prognoser för produktion och efterfrågan.
					Detta är det pris som visas här på din hemsida och som elhandelsbolag
					använder för att köpa och sälja el.
				</li>
				<li>
					<b>Intraday Market (Elbas):</b> Här kan el handlas under samma dag som
					den används, för att hantera oväntade förändringar i efterfrågan och
					upprätthålla balansen i systemet.
				</li>
			</ul>
			<br />
			<br />
			För mer information om hur elmarknaden fungerar och hur priserna sätts,
			besök Energimarknadsinspektionen.
		</section>
	);
}
