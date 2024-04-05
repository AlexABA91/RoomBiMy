"use client";
import Link from "next/link";
import React from "react";
import style from "./Footer.module.css";
import { SocialNetwork } from "./socialNetwork/SocialNetwork";
import { FooterButton } from "./footerButton/FooterButton";
import { LanguageChanger } from "@/app/ui/languageChanger/LanguageChanger";
import { useTranslation } from "next-i18next";
const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer
      className={
        style.container +
        " border-top border-dark ms-lg-5 me-lg-5 ms-sm-3 me-sm-3 ms-sx-3 me-sx-3"
      }
    >
      <div className={style.left}>
        <span>© 2024 RoomBi</span>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          {t("footerConditions")}
        </Link>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          {t("footerDetails")}
        </Link>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          {t("footerSupport")}
        </Link>
      </div>

      <div className={style.right}>
        <LanguageChanger />
        <FooterButton
          title="USD"
          src="/footer/dollar.svg"
          event="конвертер валют"
        />
        <SocialNetwork src="/footer/inst.svg" />
        <SocialNetwork src="/footer/fb.png" />
        <SocialNetwork src="/footer/git.png" />
        <SocialNetwork src="/footer/link.png" />
      </div>
    </footer>
  );
};

export { Footer };
