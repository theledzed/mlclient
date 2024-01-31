"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { setState } from "@/store/actions";
import { usePathname, useRouter } from "next/navigation";
import MeliContext from "@/store/meliContext";
import InputSearch from "@/coreComponents/InputSearch";
import styles from "./meliLayout.module.scss";

export default function MeliLayout({ children }) {
  const pathName = usePathname();
  const [hiddenChildren, setIHiddenChildren] = useState(true);
  const [state, dispatch] = useContext(MeliContext);

  const { categories = [] } = state;

  useEffect(() => {
    if (pathName === "/") {
      setIHiddenChildren(true);
    } else {
      setIHiddenChildren(false);
    }
  }, [pathName]);

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.layoutHead}>
        <div className={styles.searchContainer}>
          <Image
            src="/logo_ml2x.png"
            alt="ML Logo"
            className={styles.mlLogo}
            width={55}
            height={40}
            priority
          />
          <InputSearch />
        </div>
      </header>
      <section className={styles.sectionContainer}>
        {!hiddenChildren && (
          <div className={styles.childrenContainer}>
            <div className={styles.breadcrumbsContainer}>
              {categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <span className={styles.breadcrumbs} key={category}>
                      {index !== 0 && " >"} {category}
                    </span>
                  );
                })}
            </div>
            <div className={styles.bodyContainer}>{children}</div>
          </div>
        )}
      </section>
    </div>
  );
}
