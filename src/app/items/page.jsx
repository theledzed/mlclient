"use client";
import { useContext } from "react";
import MeliContext from "@/store/meliContext";
import ProductCard from "@/coreComponents/ProductCard";

export default function Items() {
  const [state, dispatch] = useContext(MeliContext);

  const { productList = [] } = state;

  return (
    <main>
      {productList &&
        productList.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
    </main>
  );
}
