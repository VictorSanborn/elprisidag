import { sql } from '@vercel/postgres';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '../.env' });

//Hämta ny csv här:
// https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/sok-rantor-och-valutakurser/?s=g130-SEKEURPMI&a=D&from=2018-01-02&to=2025-01-08&fs=3#result-section
// https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/sok-rantor-och-valutakurser/?s=g130-SEKEURPMI&fs=2#riksbank-seriesform

const prices = [];
const ExtractEURPrices = async () => {
	fs.createReadStream('./eur_prices.csv')
		.pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() })) // Ange separatorn som används i din CSV-fil
		.on('data', async (row) => {
			// Normalisera och konvertera data
			const date = row['Datum'];
			const price = parseFloat(row['Värde'].replace(',', '.')); // Byt ',' till '.' och konvertera till nummer

			prices.push({ datum: date, price });
		})
		.on('end', async () => {
			// Add prices to db
			// Logga resultatet
			for (let i = 0; i < prices.length; i++) {
				const date = prices[i].datum;
				const price = prices[i].price;
				console.log(`Datum: ${date}, Värde: ${price}`);
				await sql`INSERT INTO euroexchange("date", eurtosekprice)
              VALUES(${date}, ${price});`;
			}
		});
};

ExtractEURPrices();
