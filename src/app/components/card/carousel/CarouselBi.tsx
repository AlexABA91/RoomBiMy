import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import { CarouselBiProps } from "../../../type/type";
import style from "./carouselBi.module.css";

const CarouselBi: React.FC<CarouselBiProps> = ({ pictures, handleClick }) => {
  return (
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
      {pictures.map((item, index) => {
        return (
          <Carousel.Item
            key={index}
            className={style.carouseliItem}
            onClick={handleClick}
          >
            <Image
              className={style.border}
              src={`https://roombi.space/Car/${item.pictureUrl}`}
              // fill={true}
              alt={item.pictureName}
              width={200}
              height={200}
              // sizes="(max-width: 500px) 80vw, (max-width: 1200px) 50vw, 25vw"
              priority
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { CarouselBi };
