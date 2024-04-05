import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservBtn.module.css";
import { Booking, DateBooking, Payment } from "@/app/type/type";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/app/redux/hook";
import { setStatus } from "@/app/redux/reservState/reservSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { bookingFetch, bookingPayment } from "@/app/services/bookingService";

const ReservBtn: React.FC = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [card, setCard] = useState("");
  const [cvv, setCVV] = useState("");
  const [showValidity, setShowValidity] = useState("");
  const [showCard, setShowCard] = useState("");
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<Payment[] | null | undefined>(
    null
  );

  const { id, date, totalPrice } = useAppSelector(
    (state) => state.reservReducer
  );

  const showBlock = async () => {
    if (session.data?.user?.name) {
      if (!isShow) {
        const responseData: Payment[] | null | undefined = await bookingPayment(
          session.data?.user?.name
        );
        setPaymentData(responseData);
      }
      setIsShow(!isShow);
    }
  };
  const valid = (): boolean => {
    const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (card === "") {
      if (!dateRegex.test(showValidity)) {
        setError(t("incorrectInputApartament") + " " + t("validityApartament"));
        return false;
      }
      if (cvv === "") {
        setError(t("requiredApartament") + " cvv");
        return false;
      }
      if (showValidity === "") {
        setError(t("requiredApartament") + " " + t("validityApartament"));
        return false;
      }
      if (card === "" && showCard === "") {
        setError(t("requiredApartament") + " " + t("cardApartament"));
        return false;
      }
    }

    if (
      date?.end !== undefined &&
      date.start !== undefined &&
      date?.end !== date.start
    ) {
      setError("");
      return true;
    } else {
      setError(t("chooseDateApartament"));
      return false;
    }
  };

  const confirm = async () => {
    if (valid()) {
      if (card !== "") {
        const selectedIndex: number = parseInt(card);
        if (
          date?.end !== undefined &&
          date.start !== undefined &&
          paymentData
        ) {
          const request: Booking = {
            apartmentId: id,
            checkInDate: date?.start,
            checkOutDate: date?.end,
            totalPrice: totalPrice,
            payment: paymentData[selectedIndex],
          };
          if (session.data?.user?.name) {
            const res = await bookingFetch(request, session.data?.user?.name);
            console.log("res  res #", res);
            if (res) {
              dispatch(setStatus("paymentOkApartament"));
              setIsShow(false);
            } else {
              setIsShow(false);
              dispatch(setStatus("paymentErrorApartament"));
            }
          }
        }
      } else {
        if (date?.end !== undefined && date.start !== undefined) {
          const randomIndex = Math.floor(Math.random() * 2);
          const request: Booking = {
            apartmentId: id,
            checkInDate: date?.start,
            checkOutDate: date?.end,
            totalPrice: totalPrice,
            payment: {
              cardNumber: showCard,
              expirationDate: showValidity,
              cvv: cvv,
              cardType: randomIndex === 0 ? "Visa" : "Mastercard",
            },
          };
          if (session.data?.user?.name) {
            const res = await bookingFetch(request, session.data?.user?.name);

            if (res === 200) {
              alert("Оплата здійснена успішно");
              setIsShow(false);
            } else {
              alert("Відмова зв'яжіться з вашим банком");
            }
          }
        }
      }
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setError("");
    setCard(event.target.value);
  };

  const validCard = (number1: string): boolean => {
    const parsedNumber1: number = parseInt(number1);
    if (
      !isNaN(parsedNumber1) &&
      parsedNumber1.toString().length === number1.length
    ) {
      return true;
    }
    console.error("validCard-", number1);
    return false;
  };

  const handleChangeCard = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < showCard.length) {
      setShowCard(event.target.value);
      return;
    }
    const hasSpace: boolean = event.target.value.includes(" ");
    if (!hasSpace && event.target.value.length < 4) {
      const parsedValue: number = parseInt(event.target.value);
      if (
        !isNaN(parsedValue) &&
        parsedValue.toString().length == event.target.value.length
      )
        setShowCard(event.target.value);
      return;
    }

    if (!hasSpace && event.target.value.length == 4) {
      const number1: string = event.target.value.substring(0, 4);
      if (validCard(number1)) {
        setShowCard(`${number1} `);
      }
      return;
    }
    if (hasSpace && event.target.value.length < 10) {
      const parts = event.target.value.split(" ");
      if (validCard(parts[0]) && validCard(parts[1])) {
        setShowCard(`${parts[0]} ${parts[1]}`);
      }
      return;
    }
    if (event.target.value.length >= 10 && event.target.value.length < 15) {
      let temp = event.target.value;
      if (temp.length === 10) {
        temp = temp.slice(0, 9) + " " + temp.slice(9);
      }
      const parts = temp.split(" ");
      if (validCard(parts[0]) && validCard(parts[1]) && validCard(parts[2])) {
        setShowCard(`${parts[0]} ${parts[1]} ${parts[2]}`);
      }
      return;
    }
    if (event.target.value.length > 14 && event.target.value.length < 20) {
      let temp = event.target.value;
      if (temp.length === 15) {
        temp = temp.slice(0, 14) + " " + temp.slice(14);
      }
      const parts = temp.split(" ");
      if (
        validCard(parts[0]) &&
        validCard(parts[1]) &&
        validCard(parts[2]) &&
        validCard(parts[3])
      ) {
        setShowCard(`${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`);
      }
      return;
    }
  };

  const onChangeCVV = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue: number = parseInt(event.target.value);
    if (!isNaN(parsedValue) && event.target.value.length < 4) {
      setCVV(parsedValue.toString());
    } else if (event.target.value === "") {
      setCVV("");
    }
  };

  const validDate = (month: string, year: string): boolean => {
    const parsedMonth: number = parseInt(month);
    const parsedYear: number = parseInt(year);
    if (
      !isNaN(parsedMonth) &&
      parsedMonth.toString().length == month.length &&
      !isNaN(parsedYear) &&
      parsedYear.toString().length == year.length
    ) {
      return true;
    }
    return false;
  };
  const onChangeValidity = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < showValidity.length) {
      setShowValidity(event.target.value);
      return;
    }
    const hasSlash: boolean = event.target.value.includes("/");

    if (!hasSlash && event.target.value.length < 3) {
      const parsedValue: number = parseInt(event.target.value);
      if (
        !isNaN(parsedValue) &&
        parsedValue.toString().length == event.target.value.length
      )
        setShowValidity(event.target.value);
      return;
    }
    if (!hasSlash && event.target.value.length == 3) {
      const month: string = event.target.value.substring(0, 2);
      const year: string = event.target.value.toString().substring(2, 4);
      if (validDate(month, year)) {
        setShowValidity(`${month}/${year}`);
      }
      return;
    }
    if (hasSlash && event.target.value.length > 3) {
      const month: string = event.target.value.substring(0, 2);
      const year: string = event.target.value.toString().substring(3, 5);
      if (validDate(month, year)) {
        setShowValidity(`${month}/${year}`);
      }
      return;
    } else if (event.target.value === "") {
      setShowValidity("");
    }
  };

  if (session.data)
    return (
      <div>
        <Button variant="danger" className={style.btn} onClick={showBlock}>
          {t("reserveApartament")}
        </Button>
        {isShow && (
          <div className={style.container}>
            <div>
              <p className={style.title}> {t("payUsingApartament")}</p>{" "}
              {paymentData && paymentData.length !== 0 && (
                <FormControl
                  sx={{ m: 1 }}
                  size={"small"}
                  style={{ width: "95%" }}
                >
                  <InputLabel id="demo-select-small-label">
                    {t("debitCreditApartament")}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={card}
                    label={t("debitCreditApartament")}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {paymentData &&
                      paymentData.map((item, index) => (
                        <MenuItem key={item.cardNumber} value={index}>
                          {item.cardNumber}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              {card === "" && (
                <div>
                  <TextField
                    id="outlined-basic1"
                    label={t("cardApartament")}
                    variant="outlined"
                    placeholder="0000 0000 0000 0000"
                    sx={{ m: 1 }}
                    size={"small"}
                    style={{ width: "95%" }}
                    value={showCard}
                    onChange={handleChangeCard}
                  />
                  <TextField
                    sx={{ ml: 1, mr: 1 }}
                    id="outlined-basic"
                    label={t("validityApartament")}
                    variant="outlined"
                    size="small"
                    placeholder="MM/PP"
                    style={{ width: "45%" }}
                    value={showValidity}
                    onChange={onChangeValidity}
                  />
                  <TextField
                    sx={{ ml: 1 }}
                    id="outlined-basic1"
                    size="small"
                    label="CVV"
                    placeholder="123"
                    variant="outlined"
                    style={{ width: "45%" }}
                    value={cvv}
                    onChange={onChangeCVV}
                  />{" "}
                </div>
              )}
              <Button variant="warning" className={style.btn} onClick={confirm}>
                {t("confirmApartament")}
              </Button>
              {error !== "" && <p className={style.error}>{error}</p>}
            </div>
          </div>
        )}
      </div>
    );
};

export { ReservBtn };
