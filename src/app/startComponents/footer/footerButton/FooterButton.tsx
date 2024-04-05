"use client";
import Image from "next/image";
import style from "./footerButton.module.css";

export interface FooterButtonProps {
  title: string;
  src: string;
  event: string;
}
const FooterButton: React.FC<FooterButtonProps> = ({ title, src, event }) => {
  const handleClick = () => {
    console.log("FooterButton", event);
  };

  return (
    <>
      {" "}
      <button className={style.btn} onClick={handleClick}>
        {" "}
        <Image
          className="me-1"
          src={src}
          width={20}
          height={20}
          alt={title}
        />{" "}
        {title}
      </button>{" "}
    </>
  );
};
export { FooterButton };
