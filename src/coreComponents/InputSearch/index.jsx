"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { setState } from "@/store/actions";
import { copies } from "./utils";
import axios from "axios";
import Image from "next/image";
import MeliContext from "@/store/meliContext";
import styles from "./InputSearch.module.scss";

export default function InputSearch({ isHydrate }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const pathName = usePathname();
  const [state, dispatch] = useContext(MeliContext);

  const { query } = state;

  const limit = 4;
  const EventCodeEnter = "Enter";
  const productsResultPath = `/items?search=${query ?? search}`;

  const searchProducts = async () => {
    try {
      dispatch(
        setState({
          isLoading: true,
        })
      );
      const response = await axios.get(
        `https://mlapi-seven.vercel.app/api/items?q=${
          query ?? search
        }&limit=${limit}`
      );
      if (response.data) {
        dispatch(
          setState({
            productList: response.data.items,
            categories: response.data.categories,
          })
        );
        if (pathName !== productsResultPath) {
          router.push(productsResultPath);
        }
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

  useEffect(() => {
    if (isHydrate) {
      searchProducts();
    }
  }, [isHydrate]);

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
