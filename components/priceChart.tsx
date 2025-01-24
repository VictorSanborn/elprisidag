'use client'; // Om du använder app-mappen i Next.js 15

import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function PriceChart({
	dataSet,
	threshold,
	currentHour,
	showCurrentHour,
}: {
	dataSet: {
		hour: number;
		price: number;
	}[];
	threshold: number;
	currentHour: number;
	showCurrentHour: boolean;
}) {
	// Registrera Chart.js-komponenter
	ChartJS.register(
		CategoryScale,
		LinearScale,
		LineElement,
		PointElement,
		Title,
		Tooltip,
		Legend
	);

	// Bearbeta datan
	const labels = dataSet.map((item) => item.hour - 1); // Exempel: ['08:00', '09:00', '10:00']
	const prices = dataSet.map((item) => item.price); // Exempel: [30, 45, -10, 20]

	// Data för diagrammet
	const data = {
		labels, // Timmen används som etiketter
		datasets: [
			{
				data: prices, // Priserna används som värden
				backgroundColor: 'rgba(192, 75, 186, 0.2)',
				borderWidth: 2,
				stepped: true as const, // Gör det till ett Stepped Line Chart
				pointBorderColor: prices.map(
					(price) =>
						price < threshold ? 'rgb(44, 146, 44)' : 'rgb(155, 38, 38)' // Dynamic point border color
				),
				pointBackgroundColor: prices.map(
					(price) =>
						price < threshold ? 'rgb(44, 146, 44)' : 'rgb(155, 38, 38)' // Dynamic point fill color
				),
				pointRadius: function (context: { dataIndex: number }) {
					const index = context.dataIndex;
					return currentHour + 1 === index && showCurrentHour ? 8 : 3;
				},
				pointHoverRadius: 7, // Optional: Larger radius on hover
			},
		],
	};

	// Alternativ för diagrammet
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			tooltip: {
				callbacks: {
					title: function (context: { label: string }[]) {
						// Visa timmen i tooltipen
						return `kl ${parseInt(context[0].label, 10)}:00 - ${
							parseInt(context[0].label, 10) + 1
						}:00`;
					},
					label: function (context: any) {
						// Lägg till "kr" efter värdet
						return `${context.raw.toFixed(2)} kr/kWh`;
					},
				},
			},
		},

		scales: {
			y: {
				suggestedMin: 0, // Förslag: Börja från 0, men låt negativa värden påverka axeln
			},
		},
		elements: {
			line: {
				borderColor: 'rgba(0, 0, 0, 0.1)', // Default line color
			},
		},
		segment: {
			borderColor: 'rgb(122, 122, 122)',
		},
	};

	return <Line data={data} options={options} />;
}
