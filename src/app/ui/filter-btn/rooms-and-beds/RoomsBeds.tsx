import style from "./roomsBeds.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction, useEffect } from "react";

interface TypeAllocationRadioProps {
  setState: Dispatch<SetStateAction<Filter>>;
  type: string;
}

const RoomsBeds: React.FC<TypeAllocationRadioProps> = ({ setState, type }) => {
  const { t } = useTranslation();

  const handleRadioChange = (value: string) => {
    if (type === "bathrooms") {
      setState((prevState) => ({
        ...prevState,
        bathrooms: Number(value),
      }));
    } else if (type === "bedrooms") {
      setState((prevState) => ({
        ...prevState,
        bedrooms: Number(value),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        beds: Number(value),
      }));
    }
  };
  const mapNumb = [1, 2, 3, 4, 5, 6, 7];
  return (
    <fieldset className={style.radio}>
      <div>
        <input
          type="radio"
          id={type + "huey"}
          name={type + "huey"}
          value="0"
          onChange={(e) => handleRadioChange(e.target.value)}
        />
        <label htmlFor={type + "huey"}>{t("txt10FB")}</label>
      </div>
      {mapNumb.map((item) => (
        <div key={item}>
          <input
            type="radio"
            id={"dewey" + item + type}
            name={type + "huey"}
            value={item}
            onChange={(e) => handleRadioChange(e.target.value)}
          />
          <label htmlFor={"dewey" + item + type}>{item}</label>
        </div>
      ))}

      <div>
        <input
          type="radio"
          id={type + "louie"}
          name={type + "huey"}
          value="8"
          onChange={(e) => handleRadioChange(e.target.value)}
        />
        <label htmlFor={type + "louie"}>8+</label>
      </div>
    </fieldset>
  );
};

export { RoomsBeds };
