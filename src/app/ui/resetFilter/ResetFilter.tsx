"use client";
import Image from "next/image";
import style from "./resetFilter.module.css";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { showCard, showMap } from "@/app/redux/apartmentsState/apartmentsSlice";
const ResetFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);

  const click = async () => {
    if (isShowMap) {
      dispatch(showMap());
    } else {
      dispatch(showCard());
    }
  };

  return (
    <button onClick={click} className={style.btnStyle}>
      <Image
        priority
        src="./filter/filterOff.svg"
        width={20}
        height={20}
        alt="List icon"
      />
    </button>
  );
};

export { ResetFilter };
