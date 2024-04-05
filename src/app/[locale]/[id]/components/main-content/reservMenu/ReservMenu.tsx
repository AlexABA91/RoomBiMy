import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservMenu.module.css";
import { ReservDate } from "./reserv-date/ReservDate";
import { ReservSelect } from "./reserv-select/ReservSelect";
import { DateBooking } from "@/app/type/type";
import { useTranslation } from "react-i18next";
import { ReservBtn } from "./reserv-btn/ReservBtn";

const ReservMenu: React.FC<{ data: DateBooking[] }> = ({
  data,
}: {
  data: DateBooking[];
}) => {
  const { t } = useTranslation();
  const [countDay, setCountDay] = useState(1);
  const { date, status } = useAppSelector((state) => state.reservReducer);

  const pricePerNight = useAppSelector(
    (state) => state.reservReducer.pricePerNight
  );
  const serviceFee = useAppSelector((state) => state.reservReducer.serviceFee);
  const totalPrice = useAppSelector((state) => state.reservReducer.totalPrice);
  const [ifDateEnd, setIfDateEnd] = useState(false);

  useEffect(() => {
    if (
      date?.start.day === date?.end.day &&
      date?.start.month === date?.end.month &&
      date?.start.year === date?.end.year
    ) {
      setIfDateEnd(false);
    } else {
      setIfDateEnd(true);
      if (date?.start && date?.end) {
        const timestamp1 = new Date(
          date?.start.year,
          date?.start.month,
          date?.start.day
        ).getTime();
        const timestamp2 = new Date(
          date?.end.year,
          date?.end.month,
          date?.end.day
        ).getTime();

        const differenceMs = timestamp2 - timestamp1;
        const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        setCountDay(differenceDays);
      }
    }
  }, [date]);

  return (
    <div className={style.container}>
      <div>
        <h4>
          {pricePerNight} $ {t("nightCard")}
        </h4>
      </div>
      <div className={style.form}>
        <ReservDate data={data} />
        <ReservSelect />
      </div>
      <p className={style.p}>{t("dontPayApartament")}</p>
      <div className={style.txtBlock}>
        <p>
          $ {pricePerNight} x {countDay} {t("nightCard")}
        </p>
        <p>{pricePerNight * countDay} $</p>
      </div>
      <div className={style.txtBlock}>
        <p>{t("serviceFeeApartament")} RoomBi</p>
        <p>{serviceFee} $</p>
      </div>
      <ReservBtn />

      <div className={style.txtBlockMain}>
        <p>{t("allPaymentApartament")}</p>

        <p>{totalPrice}</p>
      </div>

      {status !== "" && status === "paymentOkApartament" ? (
        <span className={style.status} style={{ color: "green" }}>
          {t(status)}
        </span>
      ) : null}
      {status !== "" && status === "paymentErrorApartament" ? (
        <span className={style.status} style={{ color: "red" }}>
          {t(status)}
        </span>
      ) : null}
    </div>
  );
};

export { ReservMenu };
