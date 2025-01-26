import { sql } from '@vercel/postgres';
import { format, set } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Example : http://localhost:3000/api/cron/historicalElectricPriceByHour?eic=10Y1001A1001A47J&date=2025-01-09

export async function GET() {
	// EIC-koder för de olika elområdena i Sverige
	// SE1 Norra Sverige	10Y1001A1001A44P
	// SE2 Norra Mellansverige	10Y1001A1001A45N
	// SE3 Södra Mellansverige	10Y1001A1001A46L
	// SE4 Södra Sverige	10Y1001A1001A47J

	//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/15692855254548-Sitemap-for-Restful-API-Integration
	//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/12845911031188-How-to-get-security-token
	//TODO: https://chatgpt.com/c/67793d8a-ff90-8007-9020-4fcf80d0ec6d

	// API-url och nyckel
	const API_URL = 'https://web-api.tp.entsoe.eu/api';
	const API_KEY = '9ac73df1-2ad5-409c-8db8-008a835f800e'; // Ersätt med din API-nyckel

	async function apiFetch(
		formatedDate,
		formatedStartDate,
		formatedEndDate,
		EIC
	) {
		// Hämta priser för SE1
		await fetchElectricityPrices(
			formatedDate,
			formatedStartDate,
			formatedEndDate,
			EIC
		);
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	// Funktion för att hämta elpriser
	async function fetchElectricityPrices(dateOnly, startDate, endDate, area) {
		try {
			const params = new URLSearchParams({
				securityToken: API_KEY,
				documentType: 'A44', // Day-ahead priser
				in_Domain: area, // Exempel: SE1, SE2, SE3, SE4
				out_Domain: area,
				periodStart: startDate,
				periodEnd: endDate,
			});

			console.log(`${API_URL}?${params.toString()}`);

			const response = await fetch(`${API_URL}?${params.toString()}`);
			if (!response.ok) {
				throw new Error(`API-fel: ${response.statusText}`);
			}

			const xmlData = await response.text();

			// Konvertera XML till JSON
			const jsonData = await parseStringPromise(xmlData);

			// Navigera JSON för att hitta priser
			const prices = jsonData.Publication_MarketDocument.TimeSeries.map(
				(series) => ({
					area: series['out_Domain.mRID'][0]._,
					price: series.Period[0].Point.map((point) => ({
						time: point.position[0],
						value: parseFloat(point['price.amount'][0]),
					})),
				})
			);
			console.log('prices', prices);

			for (let i = 0; i < prices[0].price.length; i++) {
				console.log('2', prices[0].price[i]);
				console.log(`INSERT INTO electricdailyprice("date", eic, hour, price)
				      VALUES(${dateOnly}, ${area}, ${prices[0].price[i].time}, ${prices[0].price[i].value});`);

				await sql`INSERT INTO electricdailyprice("date", eic, hour, price)
				      VALUES(${dateOnly}, ${area}, ${prices[0].price[i].time}, ${prices[0].price[i].value});`;
			}
			return { ok: true };
		} catch (error) {
			console.error('Kunde inte hämta elpriser:', error.message);
			return { error: true, message: error.message };
		}
	}

	const startDate = new Date('2018-01-03');
	const endDate = new Date('2018-01-02');

	const dates = [];
	let currentDate = startDate;

	while (currentDate > endDate) {
		dates.push(currentDate.toISOString().split('T')[0]); // Formatera till YYYY-MM-dd
		currentDate.setDate(currentDate.getDate() - 1); // Gå bakåt en dag
	}
	console.log('dates', dates);

	for (const date of dates) {
		// Define the Sweden timezone
		const swedenTimezone = 'Europe/Stockholm';

		//Set the timezone to Sweden
		let formatedStartDate = toZonedTime(date, swedenTimezone);
		let formatedEndDate = toZonedTime(date, swedenTimezone);

		//Set Correct time
		formatedStartDate = set(formatedStartDate, {
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
		formatedEndDate = set(formatedEndDate, {
			hours: 23,
			minutes: 59,
			seconds: 0,
			milliseconds: 0,
		});

		let formatedDate = format(formatedStartDate, 'yyyy-MM-dd', {
			timeZone: swedenTimezone,
		});
		formatedStartDate = format(formatedStartDate, 'yyyyMMddHHmm', {
			timeZone: swedenTimezone,
		});
		formatedEndDate = format(formatedEndDate, 'yyyyMMddHHmm', {
			timeZone: swedenTimezone,
		});

		await apiFetch(
			formatedDate,
			formatedStartDate,
			formatedEndDate,
			'10Y1001A1001A44P'
		);
		await apiFetch(
			formatedDate,
			formatedStartDate,
			formatedEndDate,
			'10Y1001A1001A45N'
		);
		await apiFetch(
			formatedDate,
			formatedStartDate,
			formatedEndDate,
			'10Y1001A1001A46L'
		);
		await apiFetch(
			formatedDate,
			formatedStartDate,
			formatedEndDate,
			'10Y1001A1001A47J'
		);

		// // Hämta priser för SE1
		// const respons = await fetchElectricityPrices(
		// 	format(dayToSearch, 'yyyy-MM-dd', {
		// 		timeZone: swedenTimezone,
		// 	}),
		// 	formatedStartDate,
		// 	formatedEndDate,
		// 	EIC
		// );
		// await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	return NextResponse.json('Done');
}
