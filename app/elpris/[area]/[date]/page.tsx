import { sql } from "@vercel/postgres";
import Link from "next/link";
import AveragePriceExamples from "../../../../components/averagePriceExamples/page";
import PriceChart from "../../../../components/priceChart";
import styles from "./page.module.css";

export default async function Home({
  params,
}: {
  params: Promise<{ area: string; date: string }>;
}) {
  const { area, date } = await params;

  const today = new Date();
  const currentHour = today.getHours();

  let areaToUse = "";
  let dateToUse = date;

  if (area === "se1") {
    areaToUse = "10Y1001A1001A44P";
  } else if (area === "se2") {
    areaToUse = "10Y1001A1001A45N";
  } else if (area === "se3") {
    areaToUse = "10Y1001A1001A46L";
  } else if (area === "se4") {
    areaToUse = "10Y1001A1001A47J";
  }

  if (date === "idag") {
    //Om datum är "idag" sätt datumet till dagens datum
    dateToUse = today.toISOString().split("T")[0];
  } else if (date === "imorgon") {
    //Om datum är "imorgon" sätt datumet till dagens datum
    today.setDate(today.getDate() + 1);
    dateToUse = today.toISOString().split("T")[0];
    console.log(":D");
  } else {
    //Datum är antaglien i formatet YYYY-MM-DD, använd det datumet
  }

  // Om klockan är före 12:00, sätt datumet till igår
  if (currentHour < 12 || date === "imorgon") {
    today.setDate(today.getDate() - 1); // Sätt datumet till igår
  }

  const queryDate = today.toISOString().split("T")[0]; // Format YYYY-MM-DD

  const chartData = [];
  const euroPriceResponse =
    await sql`SELECT * FROM euroexchange WHERE date = ${queryDate}`;
  const euroPrice = euroPriceResponse.rows[0]?.eurtosekprice;
  const data =
    await sql`SELECT * FROM electricdailyprice WHERE eic = ${areaToUse} AND date = ${dateToUse}`;

  const AveragePricePerPriceArea = async (eic: string): Promise<string> => {
    const avgResponse =
      await sql`SELECT AVG(price) AS average_price FROM electricdailyprice WHERE eic = ${eic} AND date = ${dateToUse};`;

    const priceAvg = (avgResponse.rows[0]?.average_price * euroPrice) / 1000;
    return priceAvg.toFixed(2);
  };

  const avgSE1 = await AveragePricePerPriceArea("10Y1001A1001A44P");
  const avgSE2 = await AveragePricePerPriceArea("10Y1001A1001A45N");
  const avgSE3 = await AveragePricePerPriceArea("10Y1001A1001A46L");
  const avgSE4 = await AveragePricePerPriceArea("10Y1001A1001A47J");

  for (let i = 0; i < data.rows.length; i++) {
    chartData.push({
      hour: data.rows[i].hour,
      price: (data.rows[i].price * euroPrice) / 1000,
    });
  }

  const averagePrice =
    chartData.reduce((acc, item) => acc + item.price, 0) / chartData.length;

  let maxPrice = -9990.99;
  let minPrice = 9999.99;

  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i].price > maxPrice) {
      maxPrice = chartData[i].price;
    }
    if (chartData[i].price < minPrice) {
      minPrice = chartData[i].price;
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.info}>
          Alla priser på sidan avser spotpriset, inga andra avgifter, moms och
          skatter är tillagda
        </p>

        {chartData.length > 0 ? (
          <h3 className={styles.average}>
            {dateToUse} Nuvarande pris{" "}
            <span>
              {chartData.map((data) =>
                data.hour == currentHour ? data.price.toFixed(2) : null
              )}
            </span>{" "}
            SEK/kWh
          </h3>
        ) : (
          <h2 className={styles.average}>
            Nästa dags data kommer tidigast runt kl 13.
          </h2>
        )}
        <section>
          <div className={styles.dateToggler}>
            <Link
              href={
                date === "idag"
                  ? `/elpris/${area}/imorgon`
                  : `/elpris/${area}/idag`
              }
            >
              Visa priserna för {date === "idag" ? "imorgon" : "idag"}
            </Link>
          </div>
        </section>
        <p className={styles.info}>
          Snittpris: <span>{averagePrice.toFixed(2)}</span> kr/kWh
        </p>
        <p>
          Maxpris: <span>{maxPrice.toFixed(2)}</span> kr/kWh
        </p>
        <p>
          Minpris: <span>{minPrice.toFixed(2)}</span> kr/kWh
        </p>

        <section className={styles.chart}>
          <PriceChart
            dataSet={chartData}
            threshold={averagePrice}
            currentHour={currentHour}
          />
        </section>

        <section>
          <div>
            Snittpris SE1: <span>{avgSE1}</span>
            kr/kWh
          </div>
          <div>
            Snittpris SE2: <span>{avgSE2}</span> kr/kWh
          </div>
          <div>
            Snittpris SE3: <span>{avgSE3}</span> kr/kWh
          </div>
          <div>
            Snittpris SE4: <span>{avgSE4}</span> kr/kWh
          </div>
        </section>

        <AveragePriceExamples dateToShow={date} averagePrice={averagePrice} />
      </main>
    </div>
  );
}
