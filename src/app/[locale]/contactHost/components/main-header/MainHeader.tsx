"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./mainHeader.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const MainHeader: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <div className={style.leftBlock}>
        <h3>
          {t("contactHostApartament")} {data.master.name}
        </h3>
        <p> {t("txt14HM")}</p>
      </div>
      <div className={style.rightBlock}>
        <Image
          className={style.image}
          src={`https://roombi.space/Avatar/${data.master.profilePicture}`}
          alt={"share url"}
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
};
export { MainHeader };
