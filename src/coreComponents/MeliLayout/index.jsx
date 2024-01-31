"use client";
import { useEffect, useState, useReducer } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { copies } from "./utils";
import { setState } from "@/store/actions";
import { Suspense } from "react";
import initialMeliState from "@/store/initialMeliState";
import Image from "next/image";
import InputSearch from "@/coreComponents/InputSearch";
import meliReducer from "@/store/meliReducer";
import MeliContext from "@/store/meliContext";
import styles from "./meliLayout.module.scss";

export default function MeliLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [hiddenChildren, setIHiddenChildren] = useState(true);
  const [isHydrate, setIsHydrate] = useState(false);
  const [state, dispatch] = useReducer(meliReducer, initialMeliState);

  const { categories = [], isLoading } = state;

  const gotoHome = () => {
    router.push(`/`);
    dispatch(
      setState({
        query: "",
      })
    );
  };

  useEffect(() => {
    if (pathName === "/") {
      setIHiddenChildren(true);
    } else {
      setIHiddenChildren(false);
    }
    if (!state.query && search) {
      setIsHydrate(true);
    } else {
      setIsHydrate(false);
    }
  }, [pathName]);

  return (
    <MeliContext.Provider value={[state, dispatch]}>
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
              onClick={() => {
                gotoHome();
              }}
            />
            <Suspense>
              <InputSearch isHydrate={isHydrate} />
            </Suspense>
          </div>
        </header>
        {isLoading ? (
          <section className={styles.sectionLoader}>
            <div className={styles.loader} />
          </section>
        ) : (
          <section className={styles.sectionContainer}>
            {!hiddenChildren ? (
              <div className={styles.childrenContainer}>
                <div className={styles.breadcrumbsContainer}>
                  {categories.length > 0 &&
                    categories.map((category, index) => {
                      return (
                        <>
                          <span key={category}>{index !== 0 && " > "}</span>
                          <span className={styles.breadcrumbs} key={category}>
                            {category}
                          </span>
                        </>
                      );
                    })}
                </div>
                <div className={styles.bodyContainer}>
                  <Suspense>{children}</Suspense>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Image
                  src="/search.png"
                  alt="ML Logo"
                  className={styles.mlLogo}
                  width={150}
                  height={150}
                  priority
                />
                <span className={styles.emptyTitle}>{copies.startSearch}</span>
                <span className={styles.emptyDescription}>
                  {copies.startSearchFind}
                </span>
              </div>
            )}
          </section>
        )}
      </div>
    </MeliContext.Provider>
  );
}
