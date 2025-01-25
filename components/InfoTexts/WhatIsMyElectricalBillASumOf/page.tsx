import styles from './page.module.css';
export default function WhatIsMyElectricalBillASumOf() {
	return (
		<section className={styles.whatIsMyElectricalBillASumOf}>
			<b>Vad består din elräkning av?</b>
			<br />
			<br />
			Din elräkning består av flera olika delar, och från 2025 införs även en
			effektskatt som kan påverka hushåll och företag beroende på deras
			elanvändning. Här är en genomgång av vad din elräkning innehåller:
			<br />
			<br />
			<h3>1. Elförbrukning (Elhandel)</h3>
			<br />
			Detta är kostnaden för den el du använder, baserat på ditt elavtal
			(rörligt, fast, eller timpris). Elpriset sätts på elbörsen Nord Pool och
			påverkas av tillgång och efterfrågan. Utöver elpriset tillkommer
			elhandlarens påslag och moms.
			<br />
			<br />
			<h3>2.Elnätavgift (Elnätskostnad)</h3>
			<br />
			Elnätavgiften täcker kostnaden för att transportera elen till ditt hem och
			betalas till det lokala elnätsbolaget. Avgiften är uppdelad i en fast del
			och en rörlig del som beror på din förbrukning.
			<br />
			<br />
			<h3>3. Skatter och avgifter</h3>
			<br />
			<ul>
				<li>
					<b>Energiskatt:</b> En skatt på elförbrukningen som varierar beroende
					på var i landet du bor.
				</li>
				<li>
					<b>Moms:</b> Moms på 25 % tillkommer på elförbrukning och nätavgift.
				</li>
				<li>
					<b>Elcertifikat:</b> Avgifter för att stödja produktionen av förnybar
					energi.
				</li>
			</ul>
			<br />
			<br />
			<h3>4. Effektskatt (Ny 2025)</h3>
			<br />
			<p>
				Effektskatten är en ny komponent som införs för att uppmuntra hushåll
				och företag att sprida ut sin elförbrukning under dygnet. Den baseras på
				den högsta effekt (kW) som används under en viss tidsperiod, snarare än
				den totala mängden el du förbrukar.
			</p>
			<br />
			<p>
				<b>Varför införs effektskatten?</b>
				<br />
				Effektskatten syftar till att minska belastningen på elnätet under tider
				av hög efterfrågan, som kalla vinterdagar eller morgontimmar. Genom att
				flytta elförbrukning till tider när belastningen är lägre, kan vi få ett
				mer stabilt elnät och minska behovet av kostsamma investeringar i ny
				kapacitet.
			</p>
			<br />
			<h4>Hur kan du påverka din elräkning med effektskatt?</h4>
			<br />
			<ul>
				<li>
					Sprid ut din elförbrukning under dygnet. Till exempel, använd
					diskmaskin eller tvättmaskin under natten eller när efterfrågan är
					låg.
				</li>
				<li>
					Överväg ett timprisavtal för att styra din elanvändning till tider med
					lägre kostnader.
				</li>
				<li>
					Investera i smarta lösningar, som energistyrning eller energilagring,
					för att minska effekttoppar.
				</li>
			</ul>
		</section>
	);
}
