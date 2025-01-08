import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/15692855254548-Sitemap-for-Restful-API-Integration
//TODO: https://transparencyplatform.zendesk.com/hc/en-us/articles/12845911031188-How-to-get-security-token
//TODO: https://chatgpt.com/c/67793d8a-ff90-8007-9020-4fcf80d0ec6d

// API-url och nyckel
const API_URL = 'https://web-api.tp.entsoe.eu/api';
const API_KEY = '9ac73df1-2ad5-409c-8db8-008a835f800e'; // Ersätt med din API-nyckel

// Funktion för att hämta elpriser
async function fetchElectricityPrices(startDate, endDate, area) {
	try {
		const params = new URLSearchParams({
			securityToken: API_KEY,
			documentType: 'A44', // Day-ahead priser
			in_Domain: area, // Exempel: SE1, SE2, SE3, SE4
			out_Domain: area,
			periodStart: startDate,
			periodEnd: endDate,
		});

		const response = await fetch(`${API_URL}?${params.toString()}`);
		if (!response.ok) {
			throw new Error(`API-fel: ${response.statusText}`);
		}

		const xmlData = await response.text();

		// Konvertera XML till JSON
		const jsonData = await parseStringPromise(xmlData);
		for (
			let i = 0;
			i < jsonData.Publication_MarketDocument.TimeSeries.length;
			i++
		) {
			console.log(
				jsonData.Publication_MarketDocument.TimeSeries[i]['out_Domain.mRID'][0]
					._
			);
		}

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

		console.log(prices[0].price);
	} catch (error) {
		console.error('Kunde inte hämta elpriser:', error.message);
	}
}

// Dagens datum i UTC-format
const today =
	new Date().toISOString().replace(/[-:]/g, '').split('T')[0] + '0000';
const tomorrow =
	new Date(Date.now() + 86400000)
		.toISOString()
		.replace(/[-:]/g, '')
		.split('T')[0] + '0000';

// Hämta priser för SE1
fetchElectricityPrices(today, tomorrow, '10Y1001A1001A46L');
// SE1	Norra Sverige	10Y1001A1001A44P
// SE2	Norra Mellansverige	10Y1001A1001A45N
// SE3	Södra Mellansverige	10Y1001A1001A46L
// SE4	Södra Sverige	10Y1001A1001A47J
