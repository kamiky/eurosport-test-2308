import {
  selectLoaded,
  selectPlayerById,
  selectPlayersList,
  selectWinMatchesList,
  selectMatchesStats,
} from "redux/selectors";
import players from "redux/__tests__/__fixtures__/players.json";
import matches from "redux/__tests__/__fixtures__/matches.json";

describe("Testing redux selector : selectLoaded", () => {
  it("(selectLoaded) should return loaded = true if both players & matches reducers are loaded", () => {
    const state = {
      players: {
        loaded: true,
        list: [],
      },
      matches: {
        loaded: true,
        list: [],
      },
    };
    const expectedOutput = true;
    expect(selectLoaded(state as any)).toEqual(expectedOutput);
  });

  it("(selectLoaded) should return loaded = false if players or matches reducer is not loaded", () => {
    const state = {
      players: {
        loaded: true,
        list: [],
      },
      matches: {
        loaded: false,
        list: [],
      },
    };
    const expectedOutput = false;
    expect(selectLoaded(state as any)).toEqual(expectedOutput);
  });
});

describe("Testing redux selectors : players", () => {
  it("(selectPlayersList) should return the players list", () => {
    const state = {
      players: {
        loaded: true,
        list: players,
      },
    };
    const expectedOutput = players;

    expect(selectPlayersList(state as any)).toEqual(expectedOutput);
  });
  it("(selectPlayerById) should return the first player by id", () => {
    const state = {
      players: {
        loaded: true,
        list: players,
      },
    };
    const expectedOutput = players[0];

    expect(selectPlayerById(state, players[0].id)).toEqual(expectedOutput);
  });

  it("(selectPlayerById) should return the second player by id", () => {
    const state = {
      players: {
        loaded: true,
        list: players,
      },
    };
    const expectedOutput = players[1];

    expect(selectPlayerById(state, players[1].id)).toEqual(expectedOutput);
  });

  it("(selectPlayerById) should return undefined if id is null", () => {
    const state = {
      players: {
        loaded: true,
        list: players,
      },
    };
    const expectedOutput = undefined;

    expect(selectPlayerById(state, null as any)).toBe(expectedOutput);
  });

  it("(selectPlayerById) should return undefined if id is incorrect", () => {
    const state = {
      players: {
        loaded: true,
        list: players,
      },
    };
    const expectedOutput = undefined;

    expect(selectPlayerById(state, "incorrect-id")).toBe(expectedOutput);
  });
});

describe("Testing redux selectors : matches", () => {
  it("(selectWinMatchesList) should return 51 wins for first player", () => {
    const state = {
      matches: {
        loaded: true,
        list: matches,
      },
    };
    const expectedOutput = 51;
    expect(selectWinMatchesList(state, players[0].id).length).toEqual(
      expectedOutput
    );
  });

  it("(selectWinMatchesList) should return 49 wins for second player", () => {
    const state = {
      matches: {
        loaded: true,
        list: matches,
      },
    };
    const expectedOutput = 49;
    expect(selectWinMatchesList(state, players[1].id).length).toEqual(
      expectedOutput
    );
  });

  it("(selectMatchesStats) should return exact match stats", () => {
    const state: any = {
      matches: {
        loaded: true,
        list: matches,
      },
    };
    const expectedOutput = {
      "player-1": {
        wins: 51,
        total: 100,
        losses: 49,
      },
      "player-2": {
        losses: 51,
        total: 100,
        wins: 49,
      },
    };
    expect(selectMatchesStats(state)).toEqual(expectedOutput);
  });
});
