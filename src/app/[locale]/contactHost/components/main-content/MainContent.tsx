"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./mainContent.module.css";
import { useTranslation } from "react-i18next";

const MainContent: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h5>{t("txt1CM")}</h5>
      <p>{data.offeredAmenities.description}</p>
      <p>{data.offeredAmenities.specialFeatures}</p>
    </div>
  );
};
export { MainContent };
