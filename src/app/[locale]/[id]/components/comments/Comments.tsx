"use client";
import { GuestCommentsForApartmentPage } from "@/app/type/type";
import style from "./comments.module.css";
import { Comment } from "../comment/Comment";
import { BtnsHowMoreComments } from "../btn-show-more-comments/BtnsHowMoreComments";

const Comments: React.FC<{ data: GuestCommentsForApartmentPage[] }> = ({
  data,
}: {
  data: GuestCommentsForApartmentPage[];
}) => {
  return (
    <div>
      <div className={style.container}>
        {data.slice(0, 4).map((item) => (
          <div key={item.id} className={style.item}>
            <Comment data={item} />
          </div>
        ))}
      </div>
      <BtnsHowMoreComments data={data} />
    </div>
  );
};
export { Comments };
