import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { authConfig } from "@/app/configs/auth";
import { getApartamentId } from "@/app/services/housesServices";
import { decodeTokenGetId } from "@/app/services/jwtDecoder";
import { Header } from "@/app/startComponents/header/Header";
import { getServerSession } from "next-auth";
import initTranslations from "../../i18n";
import { Footer } from "../../startComponents/footer/Footer";
import Loading from "./../loading";
import { UserInfo } from "./components/user-info/UserInfo";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};
const i18nNamespaces = ["translation"];
export default async function Hous({ params: { id, locale } }: Props) {
  const session = await getServerSession(authConfig);

  let hous;
  if (session) {
    if (session.user.name) {
      const idUser = decodeTokenGetId(session.user.name);
      if (idUser) {
        hous = await getApartamentId(id, idUser.toString());
      } else {
        hous = await getApartamentId(id);
      }
    }
  } else {
    hous = await getApartamentId(id);
  }

  const { resources } = await initTranslations(locale, ["translation"]);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="header-Main">
          <Header />
        </div>
        {hous ? (
          <main>
            <UserInfo data={hous} />
          </main>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
    </TranslationsProvider>
  );
}
