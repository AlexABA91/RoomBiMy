import style from "./minMaxPriceShow.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { useAppSelector } from "@/app/redux/hook";
import { useEffect, useState } from "react";

interface TypeAllocationRadioProps {
  state: Filter;
}

interface DataPrice {
  sum: number;
  count: number;
}

const priceRanges = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
  { min: 200, max: 250 },
  { min: 250, max: 300 },
  { min: 300, max: 350 },
  { min: 350, max: 400 },
  { min: 400, max: 450 },
  { min: 450, max: 500 },
  { min: 500, max: 550 },
  { min: 550, max: 600 },
  { min: 600, max: 650 },
  { min: 650, max: 700 },
  { min: 700, max: 750 },
  { min: 750, max: 800 },
];
const MinMaxPriceShow: React.FC<TypeAllocationRadioProps> = ({ state }) => {
  const { t } = useTranslation();
  const apartmentsAll = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsAll
  );

  const initialStateItems = priceRanges.map((range) => ({
    sum: range.min,
    count: 0,
  }));

  const [stateItems, setStateItems] = useState<DataPrice[]>(initialStateItems);

  useEffect(() => {
    setStateItems((prevStateItems) => {
      const updatedItems = prevStateItems.map((item) => ({
        ...item,
        count: 0,
      }));

      apartmentsAll.forEach((obj) => {
        priceRanges.forEach((range, index) => {
          if (obj.pricePerNight >= range.min && obj.pricePerNight < range.max) {
            updatedItems[index].count++;
          }
        });
      });

      return updatedItems;
    });
  }, [apartmentsAll, state.minimumPrice, state.maximumPrice]);

  return (
    <div className={style.container}>
      {stateItems.map((item, index) => (
        <div
          key={index}
          style={{
            height: `${item.count * 5 + 5}px`,
            backgroundColor:
              item.sum >= state.minimumPrice && item.sum <= state.maximumPrice
                ? "black"
                : "gray",
          }}
          className={style.item}
        ></div>
      ))}
    </div>
  );
};

export { MinMaxPriceShow };
