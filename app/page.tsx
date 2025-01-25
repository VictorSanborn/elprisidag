'use client';

import DifferentElectricalAgreements from '@/components/InfoTexts/DifferentElectricalAgreements/page';
import ElectricAreaInfo from '@/components/InfoTexts/ElectricAreaInfo/page';
import HowToSetTheSpotPrice from '@/components/InfoTexts/HowToSetTheSpotPrice/page';
import ElomradeKarta from '@/components/swedenMap/page';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<section style={{ width: '100%' }}>
					<ElomradeKarta />
				</section>
				<ElectricAreaInfo />
				<HowToSetTheSpotPrice />
				<DifferentElectricalAgreements />
			</main>
		</div>
	);
}
