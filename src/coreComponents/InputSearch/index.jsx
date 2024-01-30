"use client";
import { useContext } from "react";
import Image from "next/image";
import { setState } from "@/store/actions";
import MeliContext from "@/store/meliContext";
import styles from "./InputSearch.module.scss";
import { copies } from "./utils";

export default function InputSearch() {
  const [state, dispatch] = useContext(MeliContext);
  return (
    <div className={styles.inputContainer}>
      <input
        onChange={(event) => {
          dispatch(
            setState({
              query: event.target.value,
            })
          );
        }}
        placeholder={copies.neverStopSearch}
        type="text"
      />
      <button>
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
