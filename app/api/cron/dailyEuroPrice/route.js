import { sql } from '@vercel/postgres';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export async function GET() {
	
	const fetchHistoricalRate = async (date) => {
		try{
			const url = `https://api.exchangeratesapi.io/${date}?base=EUR&symbols=SEK&access_key=10118bcfaf30a809e16001e957e25f87`;
			const response = await fetch(url);
			const data = await response.json();

			await sql`INSERT INTO euroexchange("date", eurtosekprice)
				VALUES(${data.date}, ${data.rates.SEK});`;


			return{ ok: true, data: `${data.date}, ${data.rates.SEK}` };
		} catch (error) {
			return { error: `Internal Server Error: ${error}` };
		}	
	};

	const formattedDate = format(new Date(), 'yyyy-MM-dd');
	let respone = await fetchHistoricalRate(formattedDate);	
	return NextResponse.json(respone)
}
