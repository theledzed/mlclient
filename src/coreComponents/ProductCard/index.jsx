/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { setState } from "@/store/actions";
import { usePathname, useRouter } from "next/navigation";
import MeliContext from "@/store/meliContext";
import styles from "./productCard.module.scss";
import axios from "axios";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [state, dispatch] = useContext(MeliContext);
  const { picture, price, free_shipping, title } = product;
  const { amount, currency, decimals } = price;

  const priceFormated = amount.toLocaleString("es-ar", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals === 0 ? 0 : 2,
  });

  const getProductDetail = async () => {
    try {
      const { id, available_quantity } = product;
      const response = await axios.get(
        `https://mlapi-seven.vercel.app/api/items/${id}?quantity=${available_quantity}`
      );
      if (response.data) {
        dispatch(
          setState({
            productDetail: response.data,
          })
        );
        router.push(`/items/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div onClick={getProductDetail} className={styles.cardContainer}>
        <img src={picture} alt="ML Logo" className={styles.productImage} />
        <div className={styles.productData}>
          <div className={styles.cardHead}>
            <div>
              <span className={styles.price}>{priceFormated}</span>
              {free_shipping && (
                <Image
                  src="/ic_shipping.png"
                  alt="ML product"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <span className={styles.address}>Capital Federal</span>
          </div>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
      <div className={styles.divider} />
    </>
  );
}
