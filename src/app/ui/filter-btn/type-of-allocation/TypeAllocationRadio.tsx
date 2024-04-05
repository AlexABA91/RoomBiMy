import style from "./typeAllocationRadio.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction } from "react";

interface TypeAllocationRadioProps {
  setState: Dispatch<SetStateAction<Filter>>;
}

const TypeAllocationRadio: React.FC<TypeAllocationRadioProps> = ({
  setState,
}) => {
  const { t } = useTranslation();

  const handleRadioChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      typeAccommodation: value,
    }));
  };

  return (
    <fieldset className={style.radio}>
      <div className={style.lRadius}>
        <input
          type="radio"
          id="huey"
          name="drone"
          value="Кімната"
          onChange={(e) => handleRadioChange(e.target.value)}
        />
        <label htmlFor="huey" className={style.lRadius}>
          {t("roomTypeFB")}
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="dewey"
          name="drone"
          value="Ціле помешкання"
          onChange={(e) => handleRadioChange(e.target.value)}
        />
        <label htmlFor="dewey">{t("fullAccommodationFB")}</label>
      </div>

      <div className={style.rRadius}>
        <input
          type="radio"
          id="louie"
          name="drone"
          value="Any"
          onChange={(e) => handleRadioChange(e.target.value)}
        />
        <label htmlFor="louie" className={style.rRadius}>
          {t("anyTypeFB")}
        </label>
      </div>
    </fieldset>
  );
};

export { TypeAllocationRadio };
