import styles from './page.module.css';
export default function ElectricAreaInfo() {
	return (
		<section className={styles.electricAreaInfo}>
			<b>Sveriges Fyra Elområden</b>
			<br />
			<br />
			Sedan 2011 är Sverige uppdelat i fyra elområden (SE1–SE4), skapade för att
			hantera skillnader i tillgång och efterfrågan på el. Områdena är namngivna
			efter större städer: SE1 (Luleå), SE2 (Sundsvall), SE3 (Stockholm) och SE4
			(Malmö).
			<br />
			<br />
			Elpriserna varierar mellan områdena på grund av skillnader i elproduktion
			och efterfrågan. I norra Sverige (SE1 och SE2) är elpriserna ofta lägre
			tack vare överskott av billig vatten- och vindkraft. I södra Sverige (SE3
			och SE4) är priserna högre på grund av större efterfrågan och
			begränsningar i elöverföring från norr.
			<br />
			<br />
			Bakgrunden till uppdelningen är krav från EU att hantera flaskhalsar i
			elnätet på ett bättre sätt, vilket också ska stimulera ny elproduktion där
			behovet är som störst. Detta system skapar tydliga prisskillnader,
			särskilt under vintern när efterfrågan ökar och väderförhållanden påverkar
			elproduktionen.
			<br />
			<br />
			Lär dig mer om hur elområdena påverkar dig och hur du kan optimera din
			elförbrukning!
		</section>
	);
}
