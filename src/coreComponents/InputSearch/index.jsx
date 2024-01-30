"use client";
import { useContext } from "react";
import Image from "next/image";
import { setState } from "@/store/actions";
import MeliContext from "@/store/meliContext";
import axios from "axios";
import styles from "./InputSearch.module.scss";
import { copies } from "./utils";

export default function InputSearch() {
  const [state, dispatch] = useContext(MeliContext);

  const { query } = state;

  const limit = 4;
  const EventCodeEnter = "Enter";

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `https://mlapi-seven.vercel.app/api/items?q=${query}&limit=${limit}`
      );
      if (response.data) {
        dispatch(
          setState({
            productList: response.data.items,
            categories: response.data.categories,
            isRedirectToProductList: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={query}
        onChange={(event) => {
          dispatch(
            setState({
              query: event.target.value,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.code === EventCodeEnter) {
            searchProducts();
          }
        }}
        placeholder={copies.neverStopSearch}
        type="text"
      />
      <button onClick={searchProducts}>
        <Image
          src="/ic_search2x.png"
          alt="ML Logo"
          className={styles.mlLogo}
          width={20}
          height={20}
          priority
        />
      </button>
    </div>
  );
}
