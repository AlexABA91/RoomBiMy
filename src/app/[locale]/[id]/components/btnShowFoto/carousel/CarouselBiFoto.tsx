import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import style from "./carouselBiFoto.module.css";
import { ImgBi } from "@/app/type/type";

const CarouselBiFoto: React.FC<{ data: ImgBi[] }> = ({
  data,
}: {
  data: ImgBi[];
}) => {
  console.log("CarouselBiFoto", data);
  return (
    <div className={style.container}>
      <Carousel
        data-bs-theme="dark"
        interval={null}
        nextIcon={
          <div className={style.nextBtn}>
            <Image
              src="/filter/rightArrow.svg"
              width={15}
              height={15}
              alt="nextBtn"
            />
          </div>
        }
        prevIcon={
          <div className={style.prevBtn}>
            <Image
              src="/filter/leftArrow.svg"
              width={15}
              height={15}
              alt="prevBtn"
            />
          </div>
        }
      >
        {data.map((item, index) => {
          return (
            <Carousel.Item key={index} className={style.carouseliItem}>
              <Image
                className={style.border}
                src={`https://roombi.space/Car/${item.pictureUrl}`}
                fill={true}
                alt={item.pictureName}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export { CarouselBiFoto };
