import styles from './page.module.css';
export default function Integritetspolicy() {
	return (
		<section className={styles.integritetspolicy}>
			<p>
				Senast Editerad: <b>2025-01-26</b>
			</p>
			<br />
			<p>
				<b>Integritetspolicy</b>
			</p>
			<p>
				Denna integritetspolicy beskriver hur vi samlar in, använder och skyddar
				dina personuppgifter när du använder vår hemsida som tillhandahåller
				information om spotpriser på dagens el i Sverige. Vi värnar om din
				integritet och följer gällande lagstiftning för skydd av
				personuppgifter.
			</p>

			<section>
				<h3>1. Vilka personuppgifter samlar vi in?</h3>
				<p>Vi kan samla in och behandla följande typer av information:</p>
				<ul>
					<li>
						<b>Kontaktinformation:</b> Om du kontaktar oss via e-post eller
						formulär, kan vi samla in ditt namn, e-postadress och
						meddelandeinnehåll.
					</li>
					<li>
						<b>Teknisk information:</b> Vi kan samla in information om din
						enhet, IP-adress, webbläsare och besökets varaktighet.
					</li>
					<li>
						<b>Cookies:</b> Se cookiepolicyn nedan för detaljer om hur vi
						använder cookies.
					</li>
				</ul>
			</section>

			<section>
				<h3>2. Hur använder vi dina personuppgifter?</h3>
				<p>Vi använder de insamlade uppgifterna för följande syften:</p>
				<ul>
					<li>Tillhandahålla och underhålla våra tjänster.</li>
					<li>Besvara dina förfrågningar och kommunicera med dig.</li>
					<li>Förbättra och optimera användarupplevelsen på hemsidan.</li>
				</ul>
			</section>

			<section>
				<h3>3. Delning av personuppgifter</h3>
				<p>
					Vi delar inte dina personuppgifter med tredje parter utan ditt
					samtycke, förutom i de fall där det krävs enligt lag eller för att
					skydda våra rättigheter.
				</p>
			</section>

			<section>
				<h3>4. Dina rättigheter</h3>
				<p>Du har rätt att:</p>
				<ul>
					<li>
						Begära information om vilka personuppgifter vi behandlar om dig.
					</li>
					<li>Begära rättelse eller radering av dina uppgifter.</li>
					<li>Invända mot behandling av dina personuppgifter.</li>
				</ul>
				<p>
					För att utöva dina rättigheter kan du kontakta oss via hej@dagensel.se
				</p>
			</section>

			<section>
				<h3>5. Säkerhet</h3>
				<p>
					Vi vidtar tekniska och organisatoriska åtgärder för att skydda dina
					personuppgifter mot obehörig åtkomst, förlust eller missbruk.
				</p>
			</section>

			<section>
				<h3>6. Verktyg</h3>
				<p>
					Vi använder verktygen:
					<ul>
						<li>
							<b>Plausible</b> för att få in webbplatsstatistik för att hjälpa
							oss att förstå hur sidan används. Vi valde Plausible framför
							andra, då de inte samlar in några personuppgifter om dig som
							användare. Win win!
						</li>
					</ul>
				</p>
			</section>
		</section>
	);
}
