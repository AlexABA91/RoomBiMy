"use client";
import { GuestCommentsForApartmentPage } from "@/app/type/type";
import style from "./btnsHowMoreComments.module.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Comment } from "../comment/Comment";

const BtnsHowMoreComments: React.FC<{
  data: GuestCommentsForApartmentPage[];
}> = ({ data }: { data: GuestCommentsForApartmentPage[] }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span className={style.btn}>
        <Button variant="light" onClick={handleShow}>
          {t("btnsHowMoreCommentsStart")} {data.length}{" "}
          {t("btnsHowMoreCommentsEnd")}
        </Button>
      </span>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          {data.map((item) => (
            <div key={item.id} className={style.item}>
              <Comment data={item} />
              <span className={style.br}></span>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};
export { BtnsHowMoreComments };
