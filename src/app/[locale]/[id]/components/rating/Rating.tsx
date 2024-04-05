"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./rating.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const Rating: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();
  return (
    <div className={style.rating}>
      <Image
        src="/star.svg"
        width={15}
        height={15}
        alt="Picture of the author"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <p>{data.objectRating}</p>
      <span className={style.point}></span>
      <p>
        {data.guestComments?.length} {t("reviewsApartament")}
      </p>
    </div>
  );
};
export { Rating };
