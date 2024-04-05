"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { pushPushOnePage } from "@/app/redux/apartmentsState/apartmentsSlice";
import { Button } from "react-bootstrap";
import style from "./buttonShowMore.module.css";
import { useTranslation } from "next-i18next";
const ButtonShowMore: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClickShowMore = () => {
    dispatch(pushPushOnePage());
  };
  const apartmentsAllLength = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsAll.length
  );
  const apartmentsLength = useAppSelector(
    (state) => state.apartmentsReducer.apartments.length
  );
  if (apartmentsAllLength === 0) return <></>;
  if (apartmentsAllLength !== apartmentsLength + 6)
    return (
      <div className={style.container}>
        <Button variant="dark" onClick={handleClickShowMore}>
          {t("showMoreBtn")}
        </Button>
      </div>
    );
};
export { ButtonShowMore };
