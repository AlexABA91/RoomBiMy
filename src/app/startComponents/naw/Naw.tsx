"use client";
import Carousel from "react-bootstrap/Carousel";
import style from "./Naw.module.css";
import { filterData } from "./dataFilter/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CarouselItem } from "./carouselItem/CarouselItem";
import { FilterLngObj } from "@/app/type/type";
import { ShowMapBtn } from "@/app/ui/showMap/showMapBtn";
import { ResetFilter } from "@/app/ui/resetFilter/ResetFilter";
import { useTranslation } from "next-i18next";
import LanguageBtnPlanet from "@/app/ui/languageBtnPlanet/languageBtnPalnet";
import { FilterBtn } from "@/app/ui/filter-btn/FilterBtn";
import { useAppSelector } from "@/app/redux/hook";
const numberOfObjects = (sizeWindow: number): number => {
  if (sizeWindow < 1000) return 4;
  else if (sizeWindow > 1000 && sizeWindow < 1200) return 6;
  else return 8;
};

const DataObjects = (
  data: FilterLngObj[],
  sizeWindow: number
): FilterLngObj[][] => {
  let count: number;
  count = numberOfObjects(sizeWindow);
  let tempArray: FilterLngObj[] = [];
  let x = 0;
  return data.reduce((acum, item) => {
    if (x == count) {
      acum.push(tempArray);
      tempArray = [];
      x = 0;
    } else {
      tempArray.push(item);
      x++;
    }
    return acum;
  }, [] as FilterLngObj[][]);
};
const Naw: React.FC = () => {
  const { t } = useTranslation();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [dataObjects, setDataObjects] = useState<FilterLngObj[][] | never>([]);
  const [showNaw, setShowNaw] = useState(false);
  const length = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsAll.length
  );
  useEffect(() => {
    if (length > 0) {
      setShowNaw(true);
    }
  }, [length]);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setDataObjects(DataObjects(filterData, screenWidth));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <>
      {showNaw && (
        <div
          className={`${style.container}  ps-lg-5 pe-lg-5 ps-sm-3 pe-sm-3 ps-sx-3 pe-sx-3`}
        >
          <div className={style.carousel}>
            <Carousel
              data-bs-theme="dark"
              interval={null}
              indicators={false}
              nextIcon={
                <div className={style.nextBtn}>
                  <Image
                    src="/filter/rightArrow.svg"
                    width={15}
                    height={15}
                    alt="next"
                  />
                </div>
              }
              prevIcon={
                <div className={style.prevBtn}>
                  <Image
                    src="/filter/leftArrow.svg"
                    width={15}
                    height={15}
                    alt="prevBtn"
                  />
                </div>
              }
            >
              {dataObjects.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div className={style.itemCarousel}>
                      <CarouselItem filterData={item} />
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          <div className={style.filterBtnContainer}>
            <ResetFilter />
          </div>
          <div className={style.filterBtnContainer}>
            <FilterBtn />
          </div>
          <div className={style.filterBtnContainer}>
            <ShowMapBtn />
          </div>
          <div className={style.languageContainer}>
            <LanguageBtnPlanet />
          </div>
        </div>
      )}
    </>
  );
};

export { Naw };
