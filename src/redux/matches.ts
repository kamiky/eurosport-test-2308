import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetMatchsQuery } from "api/graphql";
import { createSelector } from "reselect";
import { RootState } from "redux/store";
import type { PlayersMatchesStats } from "interfaces/matches";

type Match = GetMatchsQuery["matches"][0];

export interface MatchesState {
  loaded: boolean;
  list: Match[];
}

const initialState: MatchesState = {
  loaded: false,
  list: [],
};

export const matches = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

// Redux actions
export const { setLoaded, setMatches } = matches.actions;

export default matches.reducer;
