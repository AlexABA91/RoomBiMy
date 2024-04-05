"use client";
import React from "react";
import style from "./cardMap.module.css";
import { CarouselMapCard } from "./carousel/CarouselMapCard";
import { Col, Row } from "react-bootstrap";
import { CardBiProps } from "@/app/type/type";
import Image from "next/image";

import { useTranslation } from "next-i18next";
const CardMap: React.FC<CardBiProps> = ({
  id,
  pictures,
  title,
  country,
  bookingFree,
  pricePerNight,
  objectRating,
}) => {
  const { t } = useTranslation();

  const handleClickRouter = () => {
    const newTabUrl = `/${id}`;
    window.open(newTabUrl, "_blank");
  };

  const handleClickHeart = () => {
    console.log("Button Heart!");
  };

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <button onClick={handleClickHeart} className={style.btnHeart}></button>
      </div>
      <div className={style.caruselContainer}>
        <div className={style.carusel}>
          <CarouselMapCard
            pictures={pictures}
            handleClick={handleClickRouter}
          />
        </div>
      </div>
      <div className={style.textContainet} onClick={handleClickRouter}>
        <Row>
          <Col xs={{ span: 8 }}>
            <p className={style.subtitle}>{title}</p>
          </Col>
          {objectRating !== 0 && (
            <Col xs={{ span: 4 }}>
              <div className={style.thisRating}>
                <Image
                  src="/star.svg"
                  width={15}
                  height={15}
                  alt="Picture of the author"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span> {objectRating}</span>
              </div>
            </Col>
          )}
        </Row>
        <p className={style.text}> {country}</p>
        <p className={style.subtitle}>
          <strong style={{ marginRight: "8px" }}>
            {pricePerNight}$ {t("nightCard")}
          </strong>
          {bookingFree}
        </p>
      </div>
    </div>
  );
};
export { CardMap };
