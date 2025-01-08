import fetch from "node-fetch";
import { format } from "date-fns";

//API key: https://manage.exchangeratesapi.io/dashboard

const fetchHistoricalRate = async (date) => {
  const url = `https://api.exchangeratesapi.io/${date}?base=EUR&symbols=SEK&access_key=10118bcfaf30a809e16001e957e25f87`;
  const response = await fetch(url);
  const data = await response.json();

  const todaysPrice = {
    date: data.date,
    base: data.base,
    rate: data.rates.SEK,
  };
  console.log(todaysPrice);
};

const formattedDate = format(new Date(), "yyyy-MM-dd");
fetchHistoricalRate(formattedDate);
