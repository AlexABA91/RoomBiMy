"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./mainHeader.module.css";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { putWishlists } from "@/app/services/wishlistsService";

const MainHeader: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const session = useSession();
  const [show, setShow] = useState(false);
  const [saveUrlImg, setSaveUrlImg] = useState("save");
  const target = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (data.wish === true) {
      setSaveUrlImg("save2");
    } else {
      setSaveUrlImg("save");
    }
  }, [data.wish]);
  const copyCurrentUrl = () => {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };
  const save = async () => {
    if (session.data?.user?.name) {
      const res = await putWishlists(data.id, session.data?.user?.name);
      console.log("res--1", res);

      if (res) {
        if (res === "Ok") {
          setSaveUrlImg("save2");
        } else if (res === "No") {
          setSaveUrlImg("save");
        }
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftBlock}>
        <h3>
          {data.title}, {data.typeApartment}
        </h3>
      </div>
      <div className={style.rightBlock}>
        <Button
          ref={target}
          variant="light"
          className={style.btn}
          onClick={copyCurrentUrl}
        >
          {" "}
          <Image
            className={style.image}
            src={`/userInfo/share.svg`}
            alt={"share url"}
            width={15}
            height={15}
            priority
          />{" "}
          {t("shareUrl")}
        </Button>
        <Overlay target={target.current} show={show} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {t("linkCopied")}
            </Tooltip>
          )}
        </Overlay>
        {session.data && (
          <Button variant="light" className={style.btn} onClick={save}>
            <Image
              className={style.image}
              src={`/userInfo/${saveUrlImg}.png`}
              alt={"save"}
              width={15}
              height={15}
              priority
            />
            {t("saveApartament")}
          </Button>
        )}
      </div>
    </div>
  );
};
export { MainHeader };
