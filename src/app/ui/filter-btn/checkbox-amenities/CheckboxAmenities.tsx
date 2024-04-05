import style from "./checkboxAmenities.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {
  TheMostNecessary,
  Characteristics,
  Location,
  Safety,
  HostLanguage,
} from "./data";
import { FilterCheckboxAmenities } from "@/app/type/type";

interface TypeCheckboxAmenities {
  setState: Dispatch<SetStateAction<Filter>>;
  type: string;
}

const CheckboxAmenities: React.FC<TypeCheckboxAmenities> = ({
  setState,
  type,
}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<FilterCheckboxAmenities[]>([]);
  useEffect(() => {
    if (type === "txtFB_1") {
      setValue(TheMostNecessary);
    } else if (type === "txtFB_2") {
      setValue(Characteristics);
    } else if (type === "txtFB_3") {
      setValue(Location);
    } else if (type === "txtFB_L0") {
      setValue(HostLanguage);
    } else {
      setValue(Safety);
    }
  }, [type]);

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const updatedValue = [...value];

      if (!updatedValue[index].isChecked) {
        // Додати значення до масиву, якщо воно ще не вибране
        updatedValue[index].isChecked = true;
        setValue(updatedValue);
        if (type !== "txtFB_L0") {
          setState((prevState) => ({
            ...prevState,
            offeredAmenitiesDTO: [...prevState.offeredAmenitiesDTO, newValue],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            hostsLanguage: [...prevState.hostsLanguage, newValue],
          }));
        }
      } else {
        updatedValue[index].isChecked = false;
        setValue(updatedValue);
        if (type !== "txtFB_L0") {
          setState((prevState) => ({
            ...prevState,
            offeredAmenitiesDTO: prevState.offeredAmenitiesDTO.filter(
              (item) => item !== newValue
            ),
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            hostsLanguage: prevState.hostsLanguage.filter(
              (item) => item !== newValue
            ),
          }));
        }
      }
    };

  return (
    <>
      {value.length !== 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>{t(type)}</h3>

          <FormGroup>
            <div className={style.container}>
              {value.map((item, index) => (
                <FormControlLabel
                  key={index}
                  className={style.item}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                      value={item.value}
                      checked={item.isChecked}
                      onChange={handleChange(index)}
                    />
                  }
                  label={t(item.keyLocale)}
                />
              ))}
            </div>
          </FormGroup>
        </div>
      )}
    </>
  );
};

export { CheckboxAmenities };
