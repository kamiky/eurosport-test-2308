import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetPlayersQuery } from "api/graphql";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

type Player = GetPlayersQuery["players"][0];

export interface PlayersState {
  loaded: boolean;
  list: Player[];
}

const initialState: PlayersState = {
  loaded: false,
  list: [],
};

export const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

// Redux actions
export const { setLoaded, setPlayers } = players.actions;

export default players.reducer;
