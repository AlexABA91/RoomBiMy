"use client";
import style from "./filterBtn.module.css";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TypeAllocationRadio } from "./type-of-allocation/TypeAllocationRadio";
import { Filter } from "@/app/type/type";
import { RoomsBeds } from "./rooms-and-beds/RoomsBeds";
import { MinMaxPrice } from "./min-max-price/MinMaxPrice";
import { MinMaxPriceShow } from "./min-max-price-show/MinMaxPriceShow";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { CheckboxAmenities } from "./checkbox-amenities/CheckboxAmenities";
import { Button } from "@mui/material";
import { ImageCheckbox } from "./image checkbox/ImageCheckbox";
import { RatingCheckbox } from "./rating-checkbox/RatingCheckbox";
import { getFilter } from "@/app/services/housesServices";
import { setApartments } from "@/app/redux/apartmentsState/apartmentsSlice";

const FilterBtn: React.FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const handleShowCheckbox = () => setShowCheckbox(!showCheckbox);

  const length = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsAll.length
  );

  const initialState: Filter = {
    typeAccommodation: "Будь-який",
    minimumPrice: 0,
    maximumPrice: 800,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    rating: false,
    typeOfHousing: [],
    offeredAmenitiesDTO: [],
    hostsLanguage: [],
  };
  const [state, setState] = useState<Filter>(initialState);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const clisk = async () => {
    const data = await getFilter(state);
    dispatch(setApartments(data));
    setState(initialState);
    handleClose();
  };
  return (
    <>
      <button className={style.filterBtn} onClick={handleShow}>
        {" "}
        <Image
          className={style.imgFilterBtn}
          src="/filter/filterBtn.svg"
          width={20}
          height={20}
          alt="filterBtn"
        />
        {t("showBtnFilters")}
      </button>

      <div style={{ display: "block", position: "initial" }}>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton style={{ paddingLeft: "40%" }}>
            <Modal.Title>
              {" "}
              <h3>{t("txt0FB")}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={style.containet}>
            <h3>{t("txt1FB")}</h3>
            <p>{t("txt2FB")}</p>
            <TypeAllocationRadio setState={setState} />
            <span className={style.spanLine}></span>
            <h3>{t("txt3FB")}</h3>
            <p>{t("txt4FB")}</p>
            <div className={style.price}>
              <MinMaxPrice setState={setState} type={"bedrooms"} />
              <MinMaxPriceShow state={state} />
            </div>

            <span className={style.spanLine}></span>
            <h3>{t("txt5FB")}</h3>
            <p>{t("txt6FB")}</p>
            <RoomsBeds setState={setState} type={"bedrooms"} />
            <p>{t("txt7FB")}</p>
            <RoomsBeds setState={setState} type={"beds"} />
            <p>{t("txt8FB")}</p>
            <RoomsBeds setState={setState} type={"bathrooms"} />
            <span className={style.spanLine}></span>
            <h3>{t("txt9FB")}</h3>
            <RatingCheckbox setState={setState} />
            <span className={style.spanLine}></span>
            <h3>{t("txtFB_TH0")}</h3>
            <ImageCheckbox setState={setState} />
            <span className={style.spanLine}></span>
            <h3>{t("txtFB_0")}</h3>
            <CheckboxAmenities setState={setState} type={"txtFB_1"} />

            {showCheckbox && (
              <>
                <CheckboxAmenities setState={setState} type={"txtFB_2"} />
                <CheckboxAmenities setState={setState} type={"txtFB_3"} />
                <CheckboxAmenities setState={setState} type={"txtFB_4"} />
              </>
            )}

            <Button
              sx={{ color: "black", fontWeight: "700" }}
              onClick={handleShowCheckbox}
            >
              {t("showMoreBtn")}
            </Button>
            <span className={style.spanLine}></span>

            <CheckboxAmenities setState={setState} type={"txtFB_L0"} />
            <span className={style.spanLine}></span>
            <Button
              onClick={clisk}
              color="inherit"
              variant="contained"
              sx={{ backgroundColor: "#959595", fontWeight: "700" }}
            >
              {t("showBtnFilters")}
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export { FilterBtn };
