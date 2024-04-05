"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/redux/hook";
import style from "./rightBlock.module.css";
import { DateBi, MessageListProps } from "@/app/type/type";
import Image from "next/image";

const RightBlock: React.FC<MessageListProps> = () => {
  const { t } = useTranslation();
  const { messages } = useAppSelector((state) => state.appReducer);
  if (messages)
    console.log(
      "messages.booking.checkInDate.day",
      messages.booking.checkInDate.day
    );
  if (messages)
    return (
      <div className={style.container}>
        <h4>{t("txtFB_TH5")}</h4>
        <span className={style.span}></span>
        <Image
          className={style.img}
          src={`https://roombi.space/Car/${messages?.fotoApartment}`}
          width={220}
          height={200}
          style={{ width: "100%" }}
          alt="Picture of the author"
        />
        <h5>{messages?.nameApartment}</h5>
        <span className={style.span}></span>
        <div className={style.master}>
          <p>
            {t("hostApartament") + ": "}
            {messages.nameMaster}
          </p>
          <Image
            className={style.imgMaster}
            src={`https://roombi.space/Avatar/${messages.fotoMaster}`}
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <span className={style.span}></span>
        <div className={style.time}>
          <p>{t("Arrival")}</p>
          <p>
            {messages.booking.checkInDate.day}.
            {messages.booking.checkInDate.month}.
            {messages.booking.checkInDate.year}
          </p>
        </div>
        <div className={style.time}>
          <p>{t("Departure")}</p>
          <p>
            {messages.booking.checkOutDate.day}.
            {messages.booking.checkOutDate.month}.
            {messages.booking.checkOutDate.year}
          </p>
        </div>
        <span className={style.span}></span>
        <h5>
          {t("allPaymentApartament")} - {messages.booking.totalPrice}$
        </h5>
        <Image
          className={style.imgroomr2}
          src="/filter/roomr2.png"
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </div>
    );
};
export { RightBlock };
