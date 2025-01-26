import styles from './page.module.css';
export default function TermsOfUse() {
	return (
		<section className={styles.termsOfUse}>
			<p>
				Senast Editerad: <b>2025-01-26</b>
			</p>
			<br />
			<p>
				<b>Användarvillkor för Spotpriser på Dagens El i Sverige</b>
			</p>
			<p>
				Välkommen till vår hemsida! Genom att använda vår tjänst, som ger
				information om spotpriser för dagens el i Sverige, godkänner du följande
				användarvillkor. Läs dessa noggrant innan du använder sidan.
			</p>

			<section>
				<h3>1. Allmänt</h3>
				<p>
					Denna hemsida tillhandahåller information om aktuella elpriser och
					relaterad energidata. Syftet är att hjälpa dig som användare att få en
					bättre förståelse av elmarknaden i Sverige.
				</p>
			</section>

			<section>
				<h3>2. Ansvarsbegränsning</h3>
				<ul>
					<li>
						Informationen på sidan är baserad på data från externa källor, som
						den nordiska elbörsen Nord Pool. Vi strävar efter att tillhandahålla
						korrekt och aktuell information, men vi kan inte garantera att all
						data alltid är felfri eller uppdaterad.
					</li>
					<li>
						Vi tar inte ansvar för beslut som fattas baserat på information från
						vår sida. Användning av informationen sker på egen risk.
					</li>
				</ul>
			</section>

			<section>
				<h3>3. Immateriella rättigheter</h3>
				<ul>
					<li>
						Allt innehåll på hemsidan, inklusive texter, grafer, logotyper och
						design, är skyddat av upphovsrätt och andra immateriella
						rättigheter. Det är inte tillåtet att kopiera, sprida eller använda
						innehållet utan föregående skriftligt godkännande från oss.
					</li>
				</ul>
			</section>

			<section>
				<h3>4. Användarens ansvar</h3>
				<ul>
					<li>
						Du får inte använda vår hemsida för att utföra olagliga eller
						skadliga handlingar.
					</li>
					<li>
						Det är ditt ansvar att säkerställa att din användning av hemsidan
						överensstämmer med gällande lagar och förordningar.
					</li>
				</ul>
			</section>

			<section>
				<h3>5. Ändringar av användarvillkor</h3>
				<p>
					Vi förbehåller oss rätten att närsomhelst ändra dessa användarvillkor.
					Eventuella ändringar publiceras på denna sida, och det är ditt ansvar
					att regelbundet kontrollera uppdateringar.
				</p>
			</section>

			<section>
				<h3>6. Tredjepartslänkar</h3>
				<p>
					Vår hemsida kan innehålla länkar till tredje parts webbplatser eller
					resurser. Vi ansvarar inte för innehållet på dessa sidor eller för
					eventuella skador som kan uppstå vid användning av dem.
				</p>
			</section>

			<section>
				<h3>7. Personuppgifter och cookies</h3>
				<ul>
					<li>
						Vi kan samla in vissa personuppgifter enligt vår integritetspolicy.
						Genom att använda vår hemsida godkänner du denna insamling och
						hantering.
					</li>
					<li>
						Hemsidan använder cookies för att förbättra din användarupplevelse.
						Du kan läsa mer om detta i vår cookiepolicy.
					</li>
				</ul>
			</section>

			<section>
				<h3>8. Kontaktuppgifter</h3>
				<p>
					Om du har frågor om dessa användarvillkor eller om hemsidan i
					allmänhet, vänligen kontakta oss via hej@dagensel.se.
				</p>
			</section>
		</section>
	);
}
