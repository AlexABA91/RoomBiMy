"use client";
import { GuestCommentsForApartmentPage } from "@/app/type/type";
import style from "./comment.module.css";
import { useAppSelector } from "@/app/redux/hook";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useEffect, useState } from "react";

const Comment: React.FC<{ data: GuestCommentsForApartmentPage }> = ({
  data,
}: {
  data: GuestCommentsForApartmentPage;
}) => {
  const [src, setSrc] = useState("/userInfo/userInf.svg");
  useEffect(() => {
    if (data.userAvatar === null) {
      setSrc("/userInfo/userInf.svg");
    } else {
      setSrc(`https://roombi.space/Avatar/${data.userAvatar}`);
    }
  }, [data.userAvatar]);
  const lng = useAppSelector((state) => state.appReducer.location);
  const dateParse = (date: string) => {
    const d = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
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
    return formattedDate;
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.blockLeft}>
          <Image
            className={style.mainImage}
            src={src}
            alt={"avatar"}
            width={50}
            height={50}
            priority
          />
        </div>
        <div className={style.blockRight}>
          <p> {data.userName}</p>
          <p> {data.userCountry}</p>
        </div>
      </div>
      <div className={style.rating}>
        <Rating
          size="small"
          name="half-rating-read"
          defaultValue={data.rating}
          precision={0.5}
          readOnly
        />
        <p> {dateParse(data.dateTime.toString())}</p>
      </div>
      <p>{data.comment}</p>
    </div>
  );
};
export { Comment };
