import style from "./ratingCheckbox.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface RatingCheckboxProps {
  setState: Dispatch<SetStateAction<Filter>>;
}

const RatingCheckbox: React.FC<RatingCheckboxProps> = ({ setState }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(false);

  const handleChange = () => {
    setState((prevState) => ({
      ...prevState,
      rating: !value,
    }));
    setValue(!value);
  };

  return (
    <div className={style.container}>
      <div className={style.item}>
        <label className={style.checkboxButton}>
          <Image
            className={style.image}
            src={`/filter/RatingCheckbox.svg`}
            alt={"img"}
            width={40}
            height={40}
          />
          <input
            type="checkbox"
            value={"checkbox"}
            checked={value}
            onChange={handleChange}
          />

          <span style={{ paddingTop: "70px" }}>
            {t("txt12FB")}
            <p style={{ color: "gray", margin: "0" }}>{t("txt11FB")}</p>
          </span>
        </label>
      </div>
    </div>
  );
};

export { RatingCheckbox };
