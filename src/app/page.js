"use client";
import Image from "next/image";
import { useContext } from "react";
import MeliContext from "@/store/meliContext";
import styles from "./page.module.scss";
import InputSearch from "@/coreComponents/InputSearch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useContext(MeliContext);
  const { isRedirectToProductList, query } = state;

  useEffect(() => {
    if (isRedirectToProductList) {
      router.push(`/items?search=${query}`);
    }
  }, [isRedirectToProductList]);

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
