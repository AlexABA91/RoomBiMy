import { useAppSelector } from "@/app/redux/hook";
import style from "./typeGuest.module.css";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/app/redux/hook";
import { increment, decrement } from "@/app/redux/reservState/reservSlice";
const TypeGuest: React.FC<{ action: string; title: string }> = ({
  action,
  title,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => {
    switch (action) {
      case "numberOfAdults":
        return state.reservReducer.numberOfAdults;
      case "numberOfChildren":
        return state.reservReducer.numberOfChildren;
      case "numberOfBabies":
        return state.reservReducer.numberOfBabies;
      case "numberOfAnimals":
        return state.reservReducer.numberOfAnimals;
      default:
        return null;
    }
  });

  const incremen = () => {
    dispatch(increment(action));
  };

  const decremen = () => {
    dispatch(decrement(action));
  };

  return (
    <div className={style.block}>
      <p className={style.item}>{t(title)}</p>
      <div className={style.itemLeft}>
        <button onClick={incremen} className={style.btn}>
          +
        </button>{" "}
        <p>{data}</p>
        <button onClick={decremen} className={style.btn}>
          -
        </button>
      </div>
    </div>
  );
};

export { TypeGuest };
