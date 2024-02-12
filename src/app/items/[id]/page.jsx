"use client";
import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { setState } from "@/store/actions";
import { copies } from "./utils";
import axios from "axios";
import MeliContext from "@/store/meliContext";
import styles from "./itemDetail.module.scss";

export default function Items() {
  const [state, dispatch] = useContext(MeliContext);
  const { id } = useParams();
  const searchParams = useSearchParams();

  const available_quantity = searchParams.get("quantity");
  const { productDetail } = state;

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `https://mlapi-seven.vercel.app/api/items/${id}?quantity=${available_quantity}`
      );
      if (response.data) {
        dispatch(
          setState({
            productDetail: response.data,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const priceFormated = productDetail?.item?.price?.amount?.toLocaleString(
    "es-ar",
    {
      style: "currency",
      currency: productDetail.item.price.currency,
      minimumFractionDigits: productDetail.item.price.decimals === 0 ? 0 : 2,
    }
  );

  return (
    productDetail && (
      <main className={styles.detailContainer}>
        <div className={styles.row}>
          <img
            className={styles.productImg}
            src={productDetail.item.picture}
            alt="Product img"
          />
          <div className={styles.buybox}>
            <span className={styles.condition}>
              {productDetail.item.condition === "new"
                ? copies.new
                : copies.used}{" "}
              -{` ${productDetail.item.sold_quantity} ${copies.sold}`}
            </span>
            <span className={styles.title}>{productDetail.item.title}</span>
            <span className={styles.price}>{priceFormated}</span>
            <button className={styles.button}>{copies.buy}</button>
          </div>
        </div>
        <div className={styles.description}>
          <span className={styles.descriptionTitle}>
            {copies.productDescription}
          </span>
          <span className={styles.descriptionText}>
            {productDetail.item.description}
          </span>
        </div>
      </main>
    )
  );
}
