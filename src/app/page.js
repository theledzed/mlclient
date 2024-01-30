import Image from "next/image";
import styles from "./page.module.scss";
import InputSearch from "@/coreComponents/InputSearch";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.searchContainer}>
        <Image
          src="/logo_ml2x.png"
          alt="ML Logo"
          className={styles.mlLogo}
          width={65}
          height={50}
          priority
        />
        <InputSearch />
      </div>
    </main>
  );
}
