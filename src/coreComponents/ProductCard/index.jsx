import { useRouter } from "next/navigation";
import styles from "./productCard.module.scss";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { picture, price, free_shipping, title, seller_name } = product;
  const { amount, currency, decimals } = price;

  const priceFormated = amount.toLocaleString("es-ar", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals === 0 ? 0 : 2,
  });

  const gotoDetail = async () => {
    const { id, available_quantity } = product;
    router.push(`/items/${id}?quantity=${available_quantity}`);
  };
  return (
    <>
      <div onClick={gotoDetail} className={styles.cardContainer}>
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
            <span className={styles.address}>{seller_name}</span>
          </div>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
      <div className={styles.divider} />
    </>
  );
}
