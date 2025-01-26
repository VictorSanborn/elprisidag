import styles from './page.module.css';
export default function Cookiepolicy() {
	return (
		<section className={styles.cookiepolicy}>
			<p>
				Senast Editerad: <b>2025-01-26</b>
			</p>
			<br />
			<p>
				<b>Cookiepolicy</b>
			</p>
			<p>
				Denna cookiepolicy förklarar hur vi använder cookies och liknande
				teknologier på vår hemsida.
			</p>

			<section>
				<h3>1. Vad är cookies?</h3>
				<p>
					Cookies är små textfiler som lagras på din enhet när du besöker en
					hemsida. De hjälper oss att förbättra din användarupplevelse genom att
					lagra information om dina preferenser och tidigare aktiviteter.
				</p>
			</section>

			<section>
				<h3>2. Vilka typer av cookies använder vi?</h3>
				<ul>
					<li>
						<b>Nödvändiga cookies:</b> Dessa är nödvändiga för att hemsidan ska
						fungera korrekt och kan inte stängas av i våra system.
					</li>
					<li>
						<b>Analytiska cookies:</b> Dessa hjälper oss att förstå hur besökare
						använder hemsidan, vilket gör det möjligt för oss att förbättra
						innehållet och funktionaliteten.
					</li>
				</ul>
			</section>

			<section>
				<h3>3. Hur kan du hantera cookies?</h3>
				<p>
					Du kan hantera eller ta bort cookies genom att justera inställningarna
					i din webbläsare. Observera dock att vissa delar av hemsidan kanske
					inte fungerar korrekt om du avaktiverar cookies.
				</p>
			</section>

			<section>
				<h3>4. Tredjepartscookies</h3>
				<p>
					Vi kan använda cookies från tredje parter, till exempel Google Ads,
					för att samla in statistik, analysera trafik och anpassa annonser till
					dig baserat på dina intressen och aktiviteter på vår hemsida.
				</p>
			</section>
		</section>
	);
}
