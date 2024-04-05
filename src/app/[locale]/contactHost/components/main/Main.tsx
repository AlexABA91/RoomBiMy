"use client";
import style from "./main.module.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/redux/hook";
import { ReservMenu } from "@/app/[locale]/[id]/components/main-content/reservMenu/ReservMenu";
import { MainHeader } from "@/app/[locale]/contactHost/components/main-header/MainHeader";
import { MainContent } from "@/app/[locale]/contactHost/components/main-content/MainContent";
import { Textarea } from "@/app/[locale]/contactHost/components/textarea/Textarea";
const Main: React.FC = () => {
  const { t } = useTranslation();
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  console.log("rentalApartment", rentalApartment);
  if (rentalApartment)
    return (
      <div className={style.container}>
        <div className={style.leftBlock}>
          <MainHeader data={rentalApartment} />
          <span className={style.span}></span>
          <MainContent data={rentalApartment} />

          <span className={style.span}></span>
          <Textarea data={rentalApartment} />
        </div>
        <div className={style.rightBlock}>
          <ReservMenu data={rentalApartment.dateBooking} />
        </div>
      </div>
    );
};
export { Main };
