"use client";
import { ImgBi } from "@/app/type/type";
import style from "./foto.module.css";
import Image from "next/image";
import { ShowFoto } from "../btnShowFoto/ShowFoto";
const Foto: React.FC<{ data: ImgBi[] }> = ({ data }: { data: ImgBi[] }) => {
  const mainImage = data[0];
  let tempArr;

  if (data.length >= 5) {
    tempArr = data.slice(1, 5);
  } else {
    tempArr = data.slice(1);
  }
  return (
    <>
      {" "}
      <div className={style.container}>
        <div className={style.containerLeft}>
          <Image
            className={style.mainImage}
            src={`https://roombi.space/Car/${mainImage.pictureUrl}`}
            alt={mainImage.pictureName}
            width={500}
            height={300}
            priority
          />
        </div>
        <div className={style.containerRight}>
          <div className={style.containerTop}>
            <Image
              className={style.image}
              src={`https://roombi.space/Car/${tempArr[0].pictureUrl}`}
              alt={tempArr[0].pictureName}
              width={200}
              height={400}
              priority
            />

            <Image
              style={{ borderTopRightRadius: "15px" }}
              className={style.image}
              src={`https://roombi.space/Car/${tempArr[3].pictureUrl}`}
              alt={tempArr[1].pictureName}
              width={700}
              height={400}
              priority
            />
          </div>
          <div className={style.containerBottom}>
            <Image
              className={style.image}
              src={`https://roombi.space/Car/${tempArr[2].pictureUrl}`}
              alt={tempArr[2].pictureName}
              width={700}
              height={400}
              priority
            />

            <Image
              style={{ borderBottomRightRadius: "15px" }}
              className={style.image}
              src={`https://roombi.space/Car/${tempArr[3].pictureUrl}`}
              alt={tempArr[3].pictureName}
              width={700}
              height={400}
              priority
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <ShowFoto data={data} />
    </>
  );
};
export { Foto };
