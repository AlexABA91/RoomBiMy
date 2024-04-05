"use client";
import { ImgBi } from "@/app/type/type";
import style from "./showFoto.module.css";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CarouselBiFoto } from "./carousel/CarouselBiFoto";
const ShowFoto: React.FC<{ data: ImgBi[] }> = ({ data }: { data: ImgBi[] }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={style.container}>
      <Button
        variant="light"
        style={{ border: "1px solid black" }}
        onClick={handleShow}
      >
        <Image
          className={style.image}
          src={`/userInfo/showFoto.svg`}
          alt={"showFoto"}
          width={15}
          height={15}
          priority
        />
        {t("showAllPhotos")}
      </Button>

      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
            <div>
              <CarouselBiFoto data={data} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export { ShowFoto };
