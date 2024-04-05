import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservDate.module.css";
import { DateBooking } from "@/app/type/type";
import { ReservCalendar } from "../reserv-calendar/ReservCalendar";
import { useTranslation } from "react-i18next";

const ReservDate: React.FC<{ data: DateBooking[] }> = ({
  data,
}: {
  data: DateBooking[];
}) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const date = useAppSelector((state) => state.reservReducer.date);
  const [ifDateEnd, setIfDateEnd] = useState(false);
  useEffect(() => {
    if (
      date?.start.day === date?.end.day &&
      date?.start.month === date?.end.month &&
      date?.start.year === date?.end.year
    ) {
      setIfDateEnd(false);
    } else {
      setIsShow(false);
      setIfDateEnd(true);
    }
  }, [date]);
  const showBlock = () => {
    setIsShow(!isShow);
  };
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <div className={style.containerDate} onClick={showBlock}>
      <div className={style.item}>
        {date?.start ? (
          <p>
            {date?.start.day}/{date?.start.month}/{date?.start.year}
          </p>
        ) : (
          <p>{t("addDateApartament")}</p>
        )}
      </div>

      <div className={style.itemLeft}>
        {ifDateEnd ? (
          <p>
            {date?.end.day}/{date?.end.month}/{date?.end.year}
          </p>
        ) : (
          <p>{t("addDateApartament")}</p>
        )}
      </div>
      {isShow && (
        <div onClick={stopPropagation}>
          <ReservCalendar data={data} />
        </div>
      )}
    </div>
  );
};

export { ReservDate };
