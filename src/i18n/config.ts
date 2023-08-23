import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import general_en from "locales/en/general.json";
import players_en from "locales/en/players.json";
import matches_en from "locales/en/matches.json";

import general_fr from "locales/fr/general.json";
import players_fr from "locales/fr/players.json";
import matches_fr from "locales/fr/matches.json";

export const defaultNS = "general";
export const resources = {
  en: {
    general: general_en,
    players: players_en,
    matches: matches_en,
  },
  fr: {
    general: general_fr,
    players: players_fr,
    matches: matches_fr,
  },
} as const;

export const initialize = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n.init({
    lng: language,
    fallbackLng: language,
    ns: ["general", "players"],
    defaultNS,
    resources,
  });

  return i18n;
};
