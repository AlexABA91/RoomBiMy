import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservSelect.module.css";
import Image from "next/image";
import { GuestsBlock } from "../guests-block/reserv-select/GuestsBlock";
import { useTranslation } from "react-i18next";

const ReservSelect: React.FC = () => {
  const { t } = useTranslation();
  const adults = useAppSelector((state) => state.reservReducer.numberOfAdults);
  const children = useAppSelector(
    (state) => state.reservReducer.numberOfChildren
  );
  const babies = useAppSelector((state) => state.reservReducer.numberOfBabies);
  const animals = useAppSelector(
    (state) => state.reservReducer.numberOfAnimals
  );

  const [isShow, setIsShow] = useState(false);
  const [arrow, setArrow] = useState("/userInfo/arrowDown.svg");
  useEffect(() => {
    if (isShow) {
      setArrow("/userInfo/upArrow.svg");
    } else {
      setArrow("/userInfo/arrowDown.svg");
    }
  }, [isShow]);
  const showBlock = () => {
    setIsShow(!isShow);
  };
  return (
    <div className={style.containerDate}>
      <div className={style.item}>
        <p>
          {t("adultsApartament")} {adults}
        </p>
        {children !== 0 && (
          <p>
            , {t("childrenApartament")} {children}
          </p>
        )}
        {babies !== 0 && (
          <p>
            , {t("babiesApartament")} {babies}
          </p>
        )}
        {animals !== 0 && (
          <p>
            , {t("animalsApartament")} {animals}
          </p>
        )}
      </div>

      <div className={style.itemLeft}>
        <Image
          onClick={showBlock}
          className={style.mainImage}
          src={arrow}
          alt={"arrow"}
          width={25}
          height={25}
          priority
        />
      </div>
      {isShow && <GuestsBlock />}
    </div>
  );
};

export { ReservSelect };
