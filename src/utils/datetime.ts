import { format, formatDuration, intervalToDuration } from "date-fns";
import { fr, enGB } from "date-fns/locale";

export const getLocale = (i18nLanguage?: string) => {
  switch (i18nLanguage) {
    case "fr":
      return fr;
    default:
      return enGB;
  }
};

export const formatDatetime = (datetime: string, language?: string) => {
  const date = new Date(datetime);

  return format(date, "dd/MM/yyyy HH:mm:ss", { locale: getLocale(language) });
};

export const formatDurationBetweenTwoDates = (
  startTime: string,
  endTime: string,
  language?: string
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = intervalToDuration({ start, end });

  return formatDuration(duration, { locale: getLocale(language) });
};
