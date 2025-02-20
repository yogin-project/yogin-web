"use client";

import { Button } from "@mui/material";

import { toggleLanguage } from "./index.util";
import { useTranslation } from "react-i18next";

export default function LangButton() {
  const { t } = useTranslation();

  return (
    <Button variant="contained" onClick={toggleLanguage}>
      {t("current_lang")}
    </Button>
  );
}
