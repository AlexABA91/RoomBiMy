"use client";
import { MasterForApartmentPage } from "@/app/type/type";
import style from "./master.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
const Master: React.FC<{ data: MasterForApartmentPage }> = ({
  data,
}: {
  data: MasterForApartmentPage;
}) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <div>
        <Image
          className={style.img}
          src={`https://roombi.space/Avatar/${data.profilePicture}`}
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div>
        <p>
          {t("hostApartament")} : {data.name}
        </p>
        <p>
          {t("hGApartament")} {data.hostingGuests} {t("yearsApartament")}
        </p>
      </div>
    </div>
  );
};
export { Master };
