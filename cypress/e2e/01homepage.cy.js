import { aliasQuery } from "../utils/graphql-test-utils";
import players from "../fixtures/players";
import matches from "../fixtures/matches";

describe("Testing with incorrect data", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://kf9p4bkih6.execute-api.eu-west-1.amazonaws.com/dev/",
      (req) => {
        aliasQuery(req, "getPlayers");
        aliasQuery(req, "getMatchs");

        if (req.alias === "gqlgetMatchsQuery") {
          req.reply((res) => {
            res.body.data = {};
          });
        } else if (req.alias === "gqlgetPlayersQuery") {
          req.reply((res) => {
            res.body.data = {};
          });
        }
      }
    ).as("fetch");
    cy.visit("/");
  });

  it("should have a root element", () => {
    cy.wait("@fetch");
    cy.get("#root");
  });

  it("should have an error element", () => {
    cy.wait("@fetch");
    cy.get("#error").contains("An error occurred : No data found");
  });

  it("should not have a players-row element", () => {
    cy.wait("@fetch");
    cy.get("#players-row").should("not.exist");
  });
});

describe("Testing with valid data", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://kf9p4bkih6.execute-api.eu-west-1.amazonaws.com/dev/",
      (req) => {
        aliasQuery(req, "getPlayers");
        aliasQuery(req, "getMatchs");

        if (req.alias === "gqlgetMatchsQuery") {
          req.reply((res) => {
            res.body.data.matches = matches;
          });
        } else if (req.alias === "gqlgetPlayersQuery") {
          req.reply((res) => {
            res.body.data.players = players;
          });
        }
      }
    ).as("fetch");
    cy.visit("/");
  });
  it("should fetch 2 players", () => {
    cy.wait("@gqlgetPlayersQuery")
      .its("response.body.data.players")
      .should("have.length", 2);
  });
  it("should fetch 100 matches", () => {
    cy.wait("@gqlgetMatchsQuery")
      .its("response.body.data.matches")
      .should("have.length", 100);
  });
  it("should have a root element", () => {
    cy.get("#root");
  });
  it("should have a languages-selector element", () => {
    cy.get("#languages-selector");
  });
  it("should have a players (frame) element", () => {
    cy.get("#players");
  });
  it("should have a loading element", () => {
    cy.get("#loading");
  });
  it("should have loaded 2 players", () => {
    cy.wait("@fetch");
    cy.get("#players-row").children().should("have.length", 2);
  });
  it("should have loaded players datas", () => {
    cy.wait("@fetch");
    cy.get(".player-card #player-picture");
    cy.get(".player-card #player-name");
    cy.get(".player-card #player-age");
    cy.get(".player-card #player-rank");
    cy.get(".player-card #player-weight");
    cy.get(".player-card #player-height");
    cy.get(".player-card #player-stats-total");
    cy.get(".player-card #player-stats-wins");
    cy.get(".player-card #player-stats-losses");
  });
  it("should have a first player with correct data", () => {
    cy.wait("@fetch");
    cy.get(".player-card:first-child #player-picture");
    cy.get(".player-card:first-child #player-name").contains(
      players[0].firstname
    );
    cy.get(".player-card:first-child #player-name").contains(
      players[0].lastname
    );
    cy.get(".player-card:first-child #player-rank").contains(
      `Rank: ${players[0].stats.rank}`
    );
    cy.get(".player-card:first-child #player-weight").contains(
      `Weight: ${players[0].stats.weight / 1000} KG`
    );
    cy.get(".player-card:first-child #player-height").contains(
      `Height: ${players[0].stats.height / 100} M`
    );
    cy.get(".player-card:first-child #player-stats-total").contains(
      `Total of games played: ${matches.length}`
    );
    cy.get(".player-card:first-child #player-stats-wins").contains(`Wins: 51`);
    cy.get(".player-card:first-child #player-stats-losses").contains(
      `Losses: 49`
    );
  });
  it("should have a second player with correct data", () => {
    cy.wait("@fetch");
    cy.get(".player-card:nth-child(2) #player-picture");
    cy.get(".player-card:nth-child(2) #player-name").contains(
      players[1].firstname
    );
    cy.get(".player-card:nth-child(2) #player-name").contains(
      players[1].lastname
    );
    cy.get(".player-card:nth-child(2) #player-rank").contains(
      `Rank: ${players[1].stats.rank}`
    );
    cy.get(".player-card:nth-child(2) #player-weight").contains(
      `Weight: ${players[1].stats.weight / 1000} KG`
    );
    cy.get(".player-card:nth-child(2) #player-height").contains(
      `Height: ${players[1].stats.height / 100} M`
    );
    cy.get(".player-card:nth-child(2) #player-stats-total").contains(
      `Total of games played: ${matches.length}`
    );
    cy.get(".player-card:nth-child(2) #player-stats-wins").contains(`Wins: 49`);
    cy.get(".player-card:nth-child(2) #player-stats-losses").contains(
      `Losses: 51`
    );
  });

  it("should open the player page after click on first player", () => {
    cy.wait("@fetch");
    cy.get(".player-card:first-child").click();
    cy.location("pathname").should("eq", `/player/${players[0].id}`);
  });

  it("should open the player page after click on second player", () => {
    cy.wait("@fetch");
    cy.get(".player-card:nth-child(2)").click();
    cy.location("pathname").should("eq", `/player/${players[1].id}`);
  });
});
