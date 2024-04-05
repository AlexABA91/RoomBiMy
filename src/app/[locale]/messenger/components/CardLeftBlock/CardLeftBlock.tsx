"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./cardLeftBlock.module.css";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
  setMessages,
} from "@/app/redux/appState/appSlice";

import Image from "next/image";
import { MessageObj } from "@/app/type/type";

interface CardLeftBlockProps {
  item: MessageObj;
}
const CardLeftBlock: React.FC<CardLeftBlockProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const setMessengerDisplayLeft = () => {
    dispatch(setMessages(item));
    if (window.innerWidth > 800) {
      console.log("window.innerWidth", window.innerWidth);
      dispatch(setMessengerDisplayCenterBlock("block"));
      dispatch(setMessengerDisplayLeftBlock("block"));
    } else {
      console.log("window.innerWidth", window.innerWidth);
      dispatch(setMessengerDisplayCenterBlock("block"));
      dispatch(setMessengerDisplayLeftBlock("none"));
    }
  };
  const lng = useAppSelector((state) => state.appReducer.location);
  const dateParse = (date: string) => {
    const d = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    let formatter;
    if (lng !== "en") {
      formatter = new Intl.DateTimeFormat("uk-UA", options);
    } else {
      formatter = new Intl.DateTimeFormat("en-US", options);
    }
    const formattedDate = formatter.format(d);
    const parts = formattedDate.split(" ");
    const newFormattedDate = `${parts[1]} ${parts[0]}, ${parts[2]}`;
    return newFormattedDate;
  };
  const { messages } = useAppSelector((state) => state.appReducer);
  if (messages?.booking.apartmentId !== item?.booking.apartmentId) {
    return (
      <div className={style.container} onClick={setMessengerDisplayLeft}>
        <Image
          className={style.img}
          src={`https://roombi.space/Avatar/${item.fotoMaster}`}
          width={70}
          height={70}
          alt="Picture of the author"
        />
        <div className={style.messageContainer}>
          <p className={style.name}>{item.nameMaster}</p>
          <p onClick={setMessengerDisplayLeft} className={style.message}>
            {item.message[0].comment}
          </p>
          <p className={style.time}>
            {dateParse(item.message[0].dateTime.toString())}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.containerActive} onClick={setMessengerDisplayLeft}>
        <Image
          className={style.img}
          src={`https://roombi.space/Avatar/${item.fotoMaster}`}
          width={70}
          height={70}
          alt="Picture of the author"
        />
        <div className={style.messageContainer}>
          <p className={style.name}>{item.nameMaster}</p>
          <p onClick={setMessengerDisplayLeft} className={style.message}>
            {item.message[0].comment}
          </p>
          <p className={style.time}>
            {dateParse(item.message[0].dateTime.toString())}
          </p>
        </div>
      </div>
    );
  }
};
export { CardLeftBlock };
