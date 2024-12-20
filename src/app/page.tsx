import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <h1>{t("test")}</h1>
      <h2>{t("models.user.name")}</h2>
      <h2>{t("models.role.name")}</h2>
    </>
  );
}
