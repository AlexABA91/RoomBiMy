import { useAppSelector } from "@/app/redux/hook";
import style from "./guestsBlock.module.css";
import { TypeGuest } from "./type-guest/TypeGuest";

const dataGuests = [
  {
    action: "numberOfAdults",
    title: "adultsApartament",
  },
  {
    action: "numberOfChildren",
    title: "childrenApartament",
  },
  {
    action: "numberOfBabies",
    title: "babiesApartament",
  },
  {
    action: "numberOfAnimals",
    title: "animalsApartament",
  },
];

const GuestsBlock: React.FC = () => {
  const date = useAppSelector((state) => state.reservReducer.date);

  return (
    <div className={style.container}>
      {dataGuests.map((item) => (
        <TypeGuest key={item.action} action={item.action} title={item.title} />
      ))}
    </div>
  );
};

export { GuestsBlock };
