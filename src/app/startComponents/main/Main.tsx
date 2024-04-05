"use client";
import { CardBiProps } from "@/app/type/type";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setApartments,
  setApartmentsAll,
} from "../../redux/apartmentsState/apartmentsSlice";
import { CatdList } from "@/app/components/card-list-main/CatdList";
import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { getAllHouses } from "@/app/services/housesServices";
// import Loading from "@/app/[locale]/loading";
import { Test } from "@/app/ui/testTokenTemp/Test";
const Main: React.FC<{ cardData: CardBiProps[] }> = ({
  cardData,
}: {
  cardData: CardBiProps[];
}) => {
  const session = useSession();
  const { data } = session;
  console.log("session", data?.user?.name);
  const dispatch = useAppDispatch();

  const apartments = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("cardData", cardData);
      if (apartments.current === false) {
        dispatch(setApartments(cardData));
        const allHouses = await getAllHouses();
        console.log("allHouses", allHouses);
        dispatch(setApartmentsAll(allHouses));
      }
    };

    fetchData();

    return () => {
      apartments.current = true;
    };
  }, [cardData, dispatch]);

  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);

  const Map = useMemo(
    () =>
      dynamic(
        () =>
          import("@/app/components/map-main/MapMain").then(
            (mod) => mod.MapMain
          ),
        {
          // loading: () => <Loading />,
          ssr: false,
        }
      ),
    []
  );

  if (!isShowMap) {
    return <CatdList />;
  }
  return <Map />;
};
export { Main };
