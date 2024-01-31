"use client";
import { useContext, useEffect, useState } from "react";
import { setState } from "@/store/actions";
import MeliContext from "@/store/meliContext";
import ProductCard from "@/coreComponents/ProductCard";
import styles from "./item.module.scss";

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
