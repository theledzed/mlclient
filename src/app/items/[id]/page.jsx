"use client";
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import { setState } from "@/store/actions";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import MeliContext from "@/store/meliContext";
import { copies } from "./utils";
import styles from "./itemDetail.module.scss";

export default function Items() {
  const [state, dispatch] = useContext(MeliContext);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const available_quantity = searchParams.get("quantity");

  const { productDetail, isLoading } = state;
  useEffect(() => {
    if (!productDetail) {
      getProductDetail();
    }
  }, [productDetail]);

  const getProductDetail = async () => {
    try {
      dispatch(
        setState({
          isLoading: true,
        })
      );
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
      dispatch(
        setState({
          isLoading: false,
        })
      );
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
    !isLoading &&
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
