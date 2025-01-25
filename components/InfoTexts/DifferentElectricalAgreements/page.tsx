import styles from './page.module.css';
export default function DifferentElectricalAgreements() {
	return (
		<section className={styles.differentElectricalAgreements}>
			<b>Vilket elhandelsavtal passar dig bäst?</b>
			<br /> <br />
			När du ska välja elhandelsavtal finns det flera alternativ att överväga,
			beroende på dina behov och din förbrukning. Här går vi igenom de
			vanligaste avtalen – rörligt, fast, timpris och mixat – och förklarar vad
			som skiljer dem åt.
			<br />
			<br />
			<h3>Rörligt elavtal</h3>
			<br /> Med ett rörligt elavtal följer elpriset marknadens svängningar på
			den nordiska elbörsen. Detta är den vanligaste typen av elavtal idag och
			löper ofta utan bindningstid. Priset kan variera från månad till månad,
			vilket innebär att din elkostnad kan bli hög vid stigande elpriser men
			också låg när marknadspriserna sjunker.
			<br />
			<br />
			Din månadskostnad baseras på föregående månads volymvägda medelspotpris.
			Detta pris beräknas utifrån timpriserna och hushållens totala
			elförbrukning i ditt elområde. Om du vill ha större kontroll över din
			elkostnad per timme kan ett timprisavtal vara ett bättre alternativ.
			<br />
			<br />
			<h3>Fast elavtal</h3>
			<br />
			Ett fast elavtal innebär att du binder ditt elpris under en viss
			tidsperiod, vanligtvis 1–3 år. Detta skyddar dig från marknadens
			prissvängningar och ger en förutsägbar elkostnad. Ett fast avtal kan vara
			ett bra val om du vill undvika plötsliga pristoppar, men det innebär också
			att du kan få betala mer om elpriserna sjunker under avtalstiden.
			<br />
			<br />
			För att få det bästa fasta elpriset rekommenderas att teckna avtalet när
			elpriserna är lägre, ofta under sommaren när efterfrågan på el är mindre.
			<br />
			<br />
			<h3>Timprisavtal</h3>
			<br />
			Timprisavtal har blivit allt mer populära, särskilt bland hushåll som vill
			optimera sin elförbrukning. Här baseras elpriset på det aktuella
			timpriset, vilket gör att du kan styra din förbrukning till tider när elen
			är billigare. Detta är särskilt fördelaktigt om du har en elbil eller
			solceller.
			<br />
			<br />
			Genom att följa elpriserna och anpassa din förbrukning kan du minska dina
			kostnader betydligt – vissa studier visar en besparing på upp till 25 %
			jämfört med ett traditionellt rörligt avtal. För att dra nytta av ett
			timprisavtal behöver du dock vara aktiv och hålla koll på elpriserna,
			exempelvis via appar som Greenely eller Tibber, som ger notiser om
			prisändringar.
			<br />
			<br />
			<h3>Mixat elavtal</h3>
			<br />
			Ett mixat elavtal kombinerar rörligt och fast elpris. Ofta innebär det
			rörligt pris under sommaren, när elpriserna är lägre, och fast pris under
			vintern, när priserna vanligtvis är högre. Detta kan ge en balans mellan
			förutsägbarhet och flexibilitet.
			<br />
			<br />
			Mixade avtal erbjuds inte alltid och finns bara hos vissa elbolag under
			specifika tidsperioder.
		</section>
	);
}
