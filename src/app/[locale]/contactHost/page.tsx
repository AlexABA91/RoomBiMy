import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { Header } from "@/app/startComponents/header/Header";
import { HomeParams } from "@/app/type/type";
import initTranslations from "../../i18n";
import { Main } from "@/app/[locale]/contactHost/components/main/Main";
import Link from "next/link";

const i18nNamespaces = ["translation"];
export default async function ContactHost({
  params: { locale },
}: {
  params: HomeParams;
}) {
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
        <Main />
      </>
    </TranslationsProvider>
  );
}
