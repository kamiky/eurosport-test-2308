import React, { useCallback, useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";

import { Match, Player } from "api/graphql";
import { getPlayers } from "api/players";
import { getMatches } from "api/matches";

import { useDispatch } from "react-redux";
import { setPlayers, setLoaded as setPlayersLoaded } from "redux/players";
import { setMatches, setLoaded as setMatchesLoaded } from "redux/matches";
import {
  selectLoaded,
  selectPlayersList,
  selectMatchesStats,
} from "redux/selectors";
import { useAppSelector } from "redux/hooks";

import Languages from "components/Languages";
import PlayerCard from "components/PlayerCard";
import { Container, Frame, FlexRow } from "components/UI";

function Page() {
  const { t } = useTranslation();
  const [error, setError] = useState<ApolloError | null>(null);

  const loaded = useAppSelector(selectLoaded);
  const players = useAppSelector(selectPlayersList);
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
  }, [dispatch]);

  useEffect(() => {
    const SHOULD_FETCH = !players.length || !Object.keys(stats).length;
    SHOULD_FETCH && fetch();
  }, [fetch]);

  return (
    <Container>
      <Languages />
      <Frame id="players">
        {!loaded ? (
          <div id="loading">{t("loading")}</div>
        ) : !players?.length || error ? (
          <div id="error">{t("notfound")}</div>
        ) : (
          <FlexRow id="players-row">
            {players.map((player, index) => (
              <PlayerCard
                key={player.id}
                alignItems={"items-center"}
                player={player}
                stats={stats[player.id]}
                link={`/player/${player.id}`}
              />
            ))}
          </FlexRow>
        )}
      </Frame>
    </Container>
  );
}

export default Page;
