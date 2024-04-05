import style from "./imageCheckbox.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { TypeOfHousing } from "../checkbox-amenities/data";
import { FilterCheckboxAmenities } from "@/app/type/type";
import Image from "next/image";

interface ImageCheckboxProps {
  setState: Dispatch<SetStateAction<Filter>>;
}

const ImageCheckbox: React.FC<ImageCheckboxProps> = ({ setState }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<FilterCheckboxAmenities[]>(TypeOfHousing);

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const updatedValue = [...value];

      if (!updatedValue[index].isChecked) {
        // Додати значення до масиву, якщо воно ще не вибране
        updatedValue[index].isChecked = true;
        setValue(updatedValue);

        setState((prevState) => ({
          ...prevState,
          typeOfHousing: [...prevState.typeOfHousing, newValue],
        }));
      } else {
        updatedValue[index].isChecked = false;
        setValue(updatedValue);

        setState((prevState) => ({
          ...prevState,
          typeOfHousing: prevState.typeOfHousing.filter(
            (item) => item !== newValue
          ),
        }));
      }
    };

  return (
    <>
      {value.length !== 0 && (
        <div className={style.container}>
          {value.map((item, index) => (
            <div key={item.value} className={style.item}>
              <label className={style.checkboxButton}>
                <Image
                  className={style.image}
                  src={`/filter/${item.value}.svg`}
                  alt={"img"}
                  width={30}
                  height={30}
                />
                <input
                  type="checkbox"
                  value={item.value}
                  checked={item.isChecked}
                  onChange={handleChange(index)}
                />
                <span>{t(item.keyLocale)}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { ImageCheckbox };
