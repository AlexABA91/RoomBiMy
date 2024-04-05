import style from "./minMaxPrice.module.css";
import { useTranslation } from "react-i18next";
import { Filter } from "@/app/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider, useTheme } from "@mui/material";

interface TypeAllocationRadioProps {
  setState: Dispatch<SetStateAction<Filter>>;
  type: string;
}

const MinMaxPrice: React.FC<TypeAllocationRadioProps> = ({
  setState,
  type,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [value, setValue] = useState<number[]>([0, 800]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    setState((prevState) => ({
      ...prevState,
      minimumPrice: value[0],
    }));
    setState((prevState) => ({
      ...prevState,
      maximumPrice: value[1],
    }));
  };

  return (
    <div className={style.container}>
      <Slider
        className={style.line}
        marks
        max={800}
        min={0}
        size="small"
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.87)"
                  : "rgb(0 0 0 / 16%)"
              }`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.9,
          },
        }}
      />
    </div>
  );
};

export { MinMaxPrice };
