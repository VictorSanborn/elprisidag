import csv from 'csv-parser';
import fs from 'fs';

//Hämta ny csv här:
// https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/sok-rantor-och-valutakurser/?s=g130-SEKEURPMI&a=D&from=2018-01-02&to=2025-01-08&fs=3#result-section
// https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/sok-rantor-och-valutakurser/?s=g130-SEKEURPMI&fs=2#riksbank-seriesform

// Läs CSV-filen
fs.createReadStream('./eur_prices.csv')
	.pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() })) // Ange separatorn som används i din CSV-fil
	.on('data', (row) => {
		// Normalisera och konvertera data
		const datum = row['Datum'];
		const grupp = row['Grupp'];
		const serie = row['Serie'];
		const värde = parseFloat(row['Värde'].replace(',', '.')); // Byt ',' till '.' och konvertera till nummer

		// Logga resultatet
		console.log(`Datum: ${datum}, Värde: ${värde}`);
	})
	.on('end', () => {
		console.log('Bearbetning av CSV-fil är klar.');
	});
