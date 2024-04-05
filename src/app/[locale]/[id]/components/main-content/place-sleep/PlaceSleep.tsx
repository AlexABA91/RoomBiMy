"use client";
import { ImgBi } from "@/app/type/type";
import style from "./placeSleep.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const PlaceSleep: React.FC<{ data: ImgBi[] }> = ({
  data,
}: {
  data: ImgBi[];
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("placeSleepApartament")}</h3>
      <div className={style.container}>
        {data.map((item) => {
          if (item.pictureName === "bedroom")
            return (
              <Image
                key={item.id}
                className={style.image}
                src={`https://roombi.space/Car/${item.pictureUrl}`}
                alt={item.pictureName}
                width={500}
                height={300}
                priority
              />
            );
        })}
      </div>
    </div>
  );
};
export { PlaceSleep };
