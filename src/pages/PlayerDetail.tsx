import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";

import { Match, Player } from "api/graphql";
import { getPlayers } from "api/players";
import { getMatches } from "api/matches";

import { useDispatch } from "react-redux";
import { setPlayers, setLoaded as setPlayersLoaded } from "redux/players";
import { setMatches, setLoaded as setMatchesLoaded } from "redux/matches";
import { useAppSelector } from "redux/hooks";
import {
  selectLoaded,
  selectWinMatchesList,
  selectMatchesStats,
  selectPlayerById,
} from "redux/selectors";

import Languages from "components/Languages";
import Menu from "components/Menu";
import PlayerCard from "components/PlayerCard";
import MatchDetail from "components/MatchDetail";
import { Container, Frame, Padding } from "components/UI";

function Page() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [error, setError] = useState<ApolloError | null>(null);

  const loaded = useAppSelector(selectLoaded);
  const player = useAppSelector((state) => selectPlayerById(state, id));
  const matches = useAppSelector((state) => selectWinMatchesList(state, id));
  const stats = useAppSelector(selectMatchesStats);
  const dispatch = useDispatch();

  const fetch = useCallback(async () => {
    try {
      const promises = [getPlayers(), getMatches()];
      const results = await Promise.all(promises);
      dispatch(setPlayers(results[0] as Player[]));
      dispatch(setMatches(results[1] as Match[]));
    } catch (err) {
      dispatch(setPlayersLoaded(true));
      dispatch(setMatchesLoaded(true));
      setError(err as ApolloError);
    }
  }, []);

  useEffect(() => {
    !loaded && fetch();
  }, [loaded, fetch]);

  return (
    <Container>
      <Languages />
      <Menu />
      <Frame id="player">
        {!loaded ? (
          t("loading")
        ) : !player || error ? (
          t("notfound")
        ) : (
          <PlayerCard
            key={player.id}
            player={player}
            stats={stats[player.id]}
          />
        )}
      </Frame>
      {matches.length > 0 && (
        <Padding>
          <div className="mb-5 text-xl">
            <span className="underline">
              {t("listWins", { ns: "matches" })}
            </span>{" "}
            : ({matches.length})
          </div>
          {matches.map((match, index) => (
            <MatchDetail key={match.id} match={match} index={index} />
          ))}
        </Padding>
      )}
    </Container>
  );
}

export default Page;
