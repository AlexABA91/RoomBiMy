"use client";
import {
  Booking,
  ChatForApartmentPageDTO,
  MessageObj,
  MessageStart,
  Payment,
  RentalApartmentDTO,
} from "@/app/type/type";
import style from "./textarea.module.css";
import { useTranslation } from "react-i18next";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { ChangeEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { useRouter } from "next/navigation";
import { getAllChat, messageStart } from "@/app/services/messagesService";
import { useSession } from "next-auth/react";
import { setMessageObjList } from "@/app/redux/appState/appSlice";

const payment: Payment = {
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  cardType: "",
};
const Textarea: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const [state, setState] = useState("");
  const { date, totalPrice, rentalApartment } = useAppSelector(
    (state) => state.reservReducer
  );
  const session = useSession();

  const send = async () => {
    if (rentalApartment && date) {
      const chatForApartmentPageDTO: ChatForApartmentPageDTO = {
        comment: state,
        rentalApartmentId: rentalApartment?.id,
        masterIdUser: rentalApartment.master.id,
        guestIdUser: rentalApartment.master.id,
        dateTime: new Date(),
      };
      const booking: Booking = {
        apartmentId: rentalApartment?.id,
        checkInDate: date?.start,
        checkOutDate: date?.end,
        totalPrice: totalPrice,
        payment: payment,
      };
      const message: MessageStart = {
        message: chatForApartmentPageDTO,
        booking: booking,
      };
      // console.log("hi", message);
      if (session.data?.user?.name) {
        const res = await getAllChat(session.data?.user?.name);
        if (res) {
          dispatch(setMessageObjList(res));
        }

        // messageStart(message, session.data?.user?.name);
      }

      router.push("/messenger");
    }
  };
  return (
    <div className={style.container}>
      <FloatingLabel controlId="floatingTextarea" label={t("txt2CM")}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={state}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setState(e.target.value)
          }
          style={{
            height: "200px",
            minHeight: "200px",
            maxHeight: "200px",
            border: "1px solid black",
          }}
        />
      </FloatingLabel>
      <Button
        variant="light"
        style={{
          margin: "20px 0",
          border: "1px solid black",
          fontWeight: "700",
          width: "200px",
        }}
        onClick={send}
      >
        {t("txt3CM")}
      </Button>
    </div>
  );
};
export { Textarea };
