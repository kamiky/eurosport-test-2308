import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

function Languages() {
  const { i18n } = useTranslation();
  const changeLanguage = useCallback(
    (language: string) => () => {
      i18n.changeLanguage(language);
    },
    []
  );
  return (
    <div id="languages-selector">
      <button onClick={changeLanguage("en")} className="mr-1">
        <img
          alt="gb-flag"
          src="https://www.countryflagicons.com/FLAT/24/GB.png"
        />
      </button>
      <button onClick={changeLanguage("fr")}>
        <img
          alt="fr-flag"
          src="https://www.countryflagicons.com/FLAT/24/FR.png"
        />
      </button>
    </div>
  );
}

export default Languages;
