import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import type { PlayersMatchesStats } from "interfaces/matches";

/* REDUCERS */
const selectPlayersReducer = (state: RootState) => state.players;
const selectMatchesReducer = (state: RootState) => state.matches;

/* GLOBAL SELECTORS */

export const selectLoaded = createSelector(
  selectMatchesReducer,
  selectPlayersReducer,
  (state1, state2) => {
    return state1.loaded && state2.loaded;
  }
);

/* PLAYERS SELECTORS */
export const selectPlayersList = createSelector(
  selectPlayersReducer,
  (playersState) => playersState.list
);

export const selectPlayerById = createSelector(
  [selectPlayersReducer, (playersState, id: string | undefined) => id],
  (playersState, id: string | undefined) => {
    return playersState.list?.filter((p) => p.id === id)[0];
  }
);

/* MATCHES SELECTORS */
export const selectMatchesList = createSelector(
  selectMatchesReducer,
  (matchesState) => matchesState.list
);

export const selectWinMatchesList = createSelector(
  [
    selectMatchesReducer,
    (matchesState, playerId: string | undefined) => playerId,
  ],
  (matchesState, playerId: string | undefined) => {
    return matchesState.list?.filter((m) => m.winner.id === playerId);
  }
);

export const selectMatchesStats = createSelector(
  selectMatchesReducer,
  (matchesState) => {
    const { list } = matchesState;

    const stats: PlayersMatchesStats = {};
    if (!list?.length) {
      return stats;
    }
    for (const match of list) {
      const winner = match.winner.id;
      const losers = match.players
        .filter((p) => p.id !== winner)
        .map((p) => p.id);

      stats[winner] = stats[winner] || {};
      stats[winner]["wins"] = stats[winner]["wins"] || 0;
      stats[winner]["wins"] += 1;
      stats[winner]["total"] = stats[winner]["total"] || 0;
      stats[winner]["total"] += 1;

      for (const loser of losers) {
        stats[loser] = stats[loser] || {};
        stats[loser]["losses"] = stats[loser]["losses"] || 0;
        stats[loser]["losses"] += 1;
        stats[loser]["total"] = stats[loser]["total"] || 0;
        stats[loser]["total"] += 1;
      }
    }

    return stats;
  }
);
