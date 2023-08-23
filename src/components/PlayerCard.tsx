import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Player } from "api/graphql";
import type { PlayerMatchesStats } from "interfaces/matches";

import { convertGToKG, convertCMtoM } from "utils/math";

function PlayerCard(props: {
  alignItems?: string;
  player: Player;
  stats?: PlayerMatchesStats;
  link?: string;
}) {
  const { player, stats, alignItems, link } = props;
  const { t } = useTranslation();
  return (
    <Link key={player.id} to={link || "#"} className="player-card">
      <div
        className={`flex flex-col ${alignItems ? alignItems : "items-start"}`}
      >
        <img
          id="player-picture"
          className="rounded-lg mb-1"
          src={player.picture.url}
          alt="player"
        ></img>
        <div id="player-name" className="text-3xl text-gray-700 font-bold mb-5">
          {player.firstname} {player.lastname}
        </div>
      </div>
      <div id="player-age" className="text-l text-gray-700 mb-1">
        {t("age", { ns: "players" })}: {player.stats.age} {t("yearsOld")}
      </div>
      <div id="player-rank" className="text-l text-gray-700 mb-1">
        {t("rank", { ns: "players" })}: {player.stats.rank}
      </div>
      <div id="player-weight" className="text-l text-gray-700 mb-1">
        {t("weight", { ns: "players" })}: {convertGToKG(player.stats.weight)} KG
      </div>
      <div id="player-height" className="text-l text-gray-700 mb-1">
        {t("height", { ns: "players" })}: {convertCMtoM(player.stats.height)} M
      </div>
      {!!stats?.total && (
        <div id="player-stats-total" className="text-l text-gray-700 mb-1 ">
          {t("total", { ns: "players" })}: {stats?.total}
        </div>
      )}
      {!!stats?.wins && (
        <div
          id="player-stats-wins"
          className="text-l text-gray-700 mb-1  font-bold text-lime-500"
        >
          {t("wins", { ns: "players" })}: {stats?.wins}
        </div>
      )}
      {!!stats?.losses && (
        <div
          id="player-stats-losses"
          className="text-l text-gray-700 mb-1 font-bold"
        >
          {t("losses", { ns: "players" })}: {stats?.losses}
        </div>
      )}
    </Link>
  );
}

export default PlayerCard;
