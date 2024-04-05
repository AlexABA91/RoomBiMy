"use client";
import React, { useEffect } from "react";
import style from "./catdList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { CardBi } from "@/app/components/card/CardBi";
import { ButtonShowMore } from "@/app/ui/buttonShowMore/ButtonShowMore";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import Loading from "@/app/[locale]/loading";
import { useSession } from "next-auth/react";
import { decodeTokenGetId } from "@/app/services/jwtDecoder";
import { getFirstPage } from "@/app/services/housesServices";
import { CardBiProps } from "@/app/type/type";
import { setApartments } from "@/app/redux/apartmentsState/apartmentsSlice";

const CatdList: React.FC = () => {
  const session = useSession();
  const dispatch = useAppDispatch();

  let apartments = useAppSelector(
    (state) => state.apartmentsReducer.apartments
  );

  useEffect(() => {
    const fetchData = async () => {
      if (session.data?.user?.name) {
        const idUser = decodeTokenGetId(session.data?.user?.name);
        if (idUser) {
          dispatch(setApartments(await getFirstPage(idUser.toString())));
          console.log("fetchData-m2");
        }
      }
    };

    fetchData();
  }, [session.data?.user?.name, dispatch]);
  if (apartments) {
    return (
      <div className={`${style.container} `}>
        {/* <FileTest /> */}
        <Row>
          {apartments.map((item) => {
            return (
              <Col
                key={item.id + item.bookingFree + item.ingMap}
                xs={{ span: 12 }}
                sm={{ span: 6 }}
                md={{ span: 4 }}
                lg={{ span: 3 }}
                xl={{ span: 2 }}
              >
                <CardBi {...item} />
              </Col>
            );
          })}
        </Row>
        <ButtonShowMore />
      </div>
    );
  }
  return (
    <div>
      <Loading />
    </div>
  );
};

export { CatdList };
