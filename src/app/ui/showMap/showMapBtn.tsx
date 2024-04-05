"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { isMap } from "@/app/redux/appState/appSlice";
import { showMap, showCard } from "@/app/redux/apartmentsState/apartmentsSlice";
import style from "./showMapBtn.module.css";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
const ShowMapBtn: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);
  const [show, setShow] = useState(false);
  const length = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsAll.length
  );
  useEffect(() => {
    if (length > 0) {
      setShow(true);
    }
  }, [length]);
  const click = async () => {
    if (!isShowMap) {
      dispatch(showMap());
    } else {
      dispatch(showCard());
    }

    dispatch(isMap(!isShowMap));
  };
  return (
    <>
      {" "}
      {show && (
        <button onClick={click} className={style.btnStyle}>
          <Image
            priority
            src="./icon/map.svg"
            width={20}
            height={20}
            alt="List icon"
          />
          <p className={style.p}>{t("showMap")}</p>
        </button>
      )}
    </>
  );
};

export { ShowMapBtn };
