"use client";
import { useTranslation } from "react-i18next";
import style from "./leftBlock.module.css";
import { MessageListProps } from "@/app/type/type";
import { CardLeftBlock } from "../CardLeftBlock/CardLeftBlock";

const LeftBlock: React.FC<MessageListProps> = ({ messages }) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>{t("txt2CM")}</h1>
      </div>
      <div className={style.content}>
        {messages.map((item) => (
          <div key={item.booking.apartmentId}>
            <CardLeftBlock item={item} />

            <span className={style.span}></span>
          </div>
        ))}
      </div>
    </div>
  );
};
export { LeftBlock };
