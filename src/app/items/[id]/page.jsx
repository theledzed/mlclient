"use client";
/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import MeliContext from "@/store/meliContext";
import { copies } from "./utils";
import styles from "./itemDetail.module.scss";

export default function Items() {
  const [state, dispatch] = useContext(MeliContext);

  const { productDetail } = state;
  const { picture, condition, sold_quantity, title, price, description } =
    productDetail.item;
  const { amount, currency, decimals } = price;

  const priceFormated = amount.toLocaleString("es-ar", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals === 0 ? 0 : 2,
  });

  return (
    <main className={styles.detailContainer}>
      <div className={styles.row}>
        <img className={styles.productImg} src={picture} alt="Product img" />
        <div className={styles.buybox}>
          <span className={styles.condition}>
            {condition === "new" ? copies.new : copies.used} -
            {` ${sold_quantity} ${copies.sold}`}
          </span>
          <span className={styles.title}>{title}</span>
          <span className={styles.price}>{priceFormated}</span>
          <button className={styles.button}>{copies.buy}</button>
        </div>
      </div>
      <div className={styles.description}>
        <span className={styles.descriptionTitle}>
          {copies.productDescription}
        </span>
        <span className={styles.descriptionText}>{description}</span>
      </div>
    </main>
  );
}
