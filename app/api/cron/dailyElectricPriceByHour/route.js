import { sql } from '@vercel/postgres';
import { add, format, set } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const EIC = searchParams.get('eic');
	const day = searchParams.get('day');

	if (!EIC) {
		return NextResponse.json({ error: true, message: 'EIC is required' });
	}
	if (!day) {
		return NextResponse.json({ error: true, message: 'day is required' });
	}

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

	format(new Date(), 'yyyy-MM-dd');
	const date = new Date();
	//Add days
	let startDate = add(date, { days: day == 'today' ? 0 : 1 }); //today or tomorrow based on the query
	let endDate = startDate; //add(date, { days: 2 });

	// Define the Sweden timezone
	const swedenTimezone = 'Europe/Stockholm';

	//Set the timezone to Sweden
	startDate = toZonedTime(startDate, swedenTimezone);
	endDate = toZonedTime(endDate, swedenTimezone);

	//Set Correct time
	startDate = set(startDate, {
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	});
	endDate = set(endDate, {
		hours: 23,
		minutes: 59,
		seconds: 0,
		milliseconds: 0,
	});

	startDate = format(startDate, 'yyyyMMddHHmm', { timeZone: swedenTimezone });
	endDate = format(endDate, 'yyyyMMddHHmm', { timeZone: swedenTimezone });

	console.log(startDate, endDate);
	// Hämta priser för SE1
	const respons = await fetchElectricityPrices(
		format(add(date, { days: day == 'today' ? 0 : 1 }), 'yyyy-MM-dd', {
			timeZone: swedenTimezone,
		}),
		startDate,
		endDate,
		EIC
	);

	return NextResponse.json(respons);
}
