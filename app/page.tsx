"use client";

import styles from "./page.module.css";
import ElomradeKarta from "@/components/swedenMap/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <section>
          <Link href="/elpris/se1/idag">
            <div className={styles.areaSelection}>SE1</div>
          </Link>
          <Link href="/elpris/se2/idag">
            <div className={styles.areaSelection}>SE2</div>
          </Link>
          <Link href="/elpris/se3/idag">
            <div className={styles.areaSelection}>SE3</div>
          </Link>
          <Link href="/elpris/se4/idag">
            <div className={styles.areaSelection}>SE4</div>
          </Link>
        </section> */}
        <section style={{ width: "100%" }}>
          <ElomradeKarta />
        </section>
      </main>
      <footer className={styles.footer}>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
