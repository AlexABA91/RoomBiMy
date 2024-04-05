import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import style from "./calendarBi.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PrevArrow from "@/app/ui/arrow/PrevArrow";
import NextArrow from "@/app/ui/arrow/NextArrow";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { DateBi, DateBooking } from "@/app/type/type";
import {
  setDate,
  setStartDate,
  setTotalPrice,
} from "@/app/redux/reservState/reservSlice";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

//заповнюю діапазон між двома датами
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const datesInRange: Date[] = [];
  let currentDate = new Date(startDate);

  // Додаю кожен день у діапазоні до масиву
  while (currentDate <= endDate) {
    datesInRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesInRange;
}

const isDateInRange = (date: Date, start: Date, end: Date) => {
  return date >= start && date <= end;
};
const CalendarBi: React.FC<{ data: DateBooking[] }> = ({
  data,
}: {
  data: DateBooking[];
}) => {
  const dispatch = useAppDispatch();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showDouble, setShowDouble] = useState(true);
  const { t } = useTranslation();
  const [value, onChange] = useState<Value>(null);
  const [reserv, setReserv] = useState<Date[]>([]);
  const pricePerNight = useAppSelector(
    (state) => state.reservReducer.pricePerNight
  );
  const initState = (Data: DateBooking[] | undefined) => {
    if (Data) {
      for (let i = 0; i < Data.length; i++) {
        const startDate = new Date(
          Data[i].start.year,
          Data[i].start.month,
          Data[i].start.day
        );
        const endDate = new Date(
          Data[i].end.year,
          Data[i].end.month,
          Data[i].end.day
        );

        const reserv = getDatesInRange(startDate, endDate);
        setReserv((prevReserv) => [...prevReserv, ...reserv]);
      }
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  useEffect(() => {
    setShowDouble(
      screenWidth > 900 || screenWidth === undefined ? true : false
    );
    initState(data);
  }, [value, screenWidth, data]);

  const dateParts = (date: Date) => {
    console.log(date);
    const startDate: DateBi = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    dispatch(setDate(null));
    dispatch(setStartDate(startDate));
  };

  // Функція, яка визначає, чи дата повинна бути заблокованою
  const isDateDisabled = (date: Date): boolean => {
    // Перевіряємо, чи входить поточна дата до масиву заброньованих дат
    return reserv.some((bookedDate) => {
      return date.getTime() === bookedDate.getTime();
    });
  };

  // Обробник зміни вибраної дати
  const handleOnChange = (date: Value) => {
    for (let i = 0; i < reserv.length; i++) {
      if (
        Array.isArray(date) &&
        date.length === 2 &&
        date[0] !== null &&
        date[1] !== null
      )
        if (isDateInRange(reserv[i], date[0], date[1])) {
          console.log("isDateInRange", false);
          return (date = null);
        }
    }

    onChange(date);
    if (Array.isArray(date) && date[0] && date[1]) {
      const startDate: DateBi = {
        day: date[0].getDate(),
        month: date[0].getMonth(),
        year: date[0].getFullYear(),
      };
      const endDate: DateBi = {
        day: date[1].getDate(),
        month: date[1].getMonth(),
        year: date[1].getFullYear(),
      };

      const newDate: DateBooking = {
        start: startDate,
        end: endDate,
      };
      const timestamp1 = new Date(
        startDate.year,
        startDate.month,
        startDate.day
      ).getTime();
      const timestamp2 = new Date(
        endDate.year,
        endDate.month,
        endDate.day
      ).getTime();

      const differenceMs = timestamp2 - timestamp1;
      const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

      dispatch(setTotalPrice(differenceDays * pricePerNight));
      dispatch(setDate(newDate));
    } else {
      dispatch(setDate(null));
    }
  };

  return (
    <div className={style.whenDropDawn}>
      <Calendar
        onChange={handleOnChange}
        onClickDay={(value) => {
          dateParts(value);
        }}
        value={value}
        locale={t("ISOLocale")} // Встановлення локалізації календаря
        showDoubleView={showDouble}
        showNeighboringMonth={false} // Вимкнення відображення сусідніх місяців
        minDetail="month" // Встановлення мінімального рівня деталізації календаря
        prevLabel={<PrevArrow />} // Встановлення власного компонента для попередньої стрілки
        nextLabel={<NextArrow />} // Встановлення власного компонента для наступної стрілки
        selectRange={true} // Увімкнення можливості вибору діапазону дат
        minDate={new Date()} // Встановлення мінімальної дати, яка може бути вибрана
        tileDisabled={({ date }) => isDateDisabled(date)}
      />
    </div>
  );
};
export { CalendarBi };
