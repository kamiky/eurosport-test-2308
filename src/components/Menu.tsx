import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Menu() {
  const { t } = useTranslation();
  return (
    <div className="mb-5 mt-5">
      <Link className="font-bold underline" to="/">
        {t("home")}
      </Link>
    </div>
  );
}

export default Menu;
