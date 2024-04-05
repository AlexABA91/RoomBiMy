"use client";
import { useEffect, useState } from "react";
import { FilterLngObj } from "../../../type/type";
import { ItemNaw } from "../itemNaw/ItemNaw";
import { useAppSelector } from "@/app/redux/hook";
export interface CarouselItemProps {
  filterData: FilterLngObj[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({ filterData }) => {
  const len = useAppSelector((state) => state.appReducer.location);
  const [currentLen, setCurrentLen] = useState(len);

  useEffect(() => {
    setCurrentLen(len);
  }, [len]);

  return (
    <>
      {filterData.map((item, index) => {
        return (
          <ItemNaw
            key={item.id}
            id={item.id}
            label={item.label}
            name={len === "ua" ? item.nameUa : item.nameEn}
            name2={len === "en" ? item.nameEn : item.nameUa}
            src={item.src}
            type={item.type}
          />
        );
      })}
    </>
  );
};

export { CarouselItem };
