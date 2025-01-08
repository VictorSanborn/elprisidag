import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export async function GET() {
	//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/15692855254548-Sitemap-for-Restful-API-Integration
	//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/12845911031188-How-to-get-security-token
	//TODO: https://chatgpt.com/c/67793d8a-ff90-8007-9020-4fcf80d0ec6d

	// API-url och nyckel
	const API_URL = 'https://web-api.tp.entsoe.eu/api';
	const API_KEY = '9ac73df1-2ad5-409c-8db8-008a835f800e'; // Ersätt med din API-nyckel

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

			console.log(params.toString());

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

			for (let i = 0; i < prices[0].price.length; i++) {
				console.log('2', prices[0].price[i]);
				await sql`INSERT INTO electricdailyprice("date", eic, hour, price)
				      VALUES(${dateOnly}, ${area}, ${prices[0].price[i].time}, ${prices[0].price[i].value});`;
			}
		} catch (error) {
			console.error('Kunde inte hämta elpriser:', error.message);
		}
	}

	const formatDate = (date) =>
		date.toISOString().slice(0, 10).replace(/-/g, '') + '0000';

	const formatDateNoTime = (date) =>
		date.toISOString().slice(0, 10).replace(/-/g, '');

	const today = formatDate(new Date(Date.now() + 86400000)); // Tomorrow at midnight UTC
	const tomorrow = formatDate(new Date(Date.now() + 86400000 * 2)); // Add 24 hours to get day after

	console.log(today, tomorrow);
	// Hämta priser för SE1
	fetchElectricityPrices(
		formatDateNoTime(new Date()),
		today,
		tomorrow,
		'10Y1001A1001A46L'
	);
	// SE1	Norra Sverige	10Y1001A1001A44P
	// SE2	Norra Mellansverige	10Y1001A1001A45N
	// SE3	Södra Mellansverige	10Y1001A1001A46L
	// SE4	Södra Sverige	10Y1001A1001A47J

	return NextResponse.json({ ok: true });
}
