import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import style from "./carouselMapCard.module.css";
import { CarouselBiProps } from "@/app/type/type";

const CarouselMapCard: React.FC<CarouselBiProps> = ({
  pictures,
  handleClick,
}) => {
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
            alt="next"
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
              alt={item.pictureName}
              width={250}
              height={250}
              loading="lazy"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { CarouselMapCard };
