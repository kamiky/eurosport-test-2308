import React from "react";
import { useTranslation } from "react-i18next";
import { GetMatchsQuery } from "api/graphql";
import { formatDatetime, formatDurationBetweenTwoDates } from "utils/datetime";

type Match = GetMatchsQuery["matches"][0];

function MatchDetail(props: { index: number; match: Match }) {
  const { t, i18n } = useTranslation();
  const { index, match } = props;
  return (
    <div className="mb-5">
      <div className="font-bold">
        <span>#{index + 1}</span>
        <span> </span>
        <span>
          {match.players.map(
            (player, index) =>
              `${index > 0 ? " / " : ""}${player.firstname} ${player.lastname}`
          )}
        </span>
      </div>
      <div>
        {t("startTime", { ns: "matches" })} :{" "}
        {formatDatetime(match.startTime, i18n.language)}
      </div>
      <div>
        {t("endTime", { ns: "matches" })} :{" "}
        {formatDatetime(match.endTime, i18n.language)}
      </div>
      <div>
        {t("duration", { ns: "matches" })} :{" "}
        {formatDurationBetweenTwoDates(
          match.startTime,
          match.endTime,
          i18n.language
        )}
      </div>
    </div>
  );
}

export default MatchDetail;
