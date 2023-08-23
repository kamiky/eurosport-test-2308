import React from "react";
import PlayerCard from "components/PlayerCard";
import players from "components/__tests__/__fixtures__/players.json";
import { Player } from "api/graphql";
import { BrowserRouter } from "react-router-dom";

describe("<PlayerCard />", () => {
  it("renders first player with datas", () => {
    const player = players[0] as Player;
    // @ts-ignore
    cy.mount(
      <BrowserRouter>
        <PlayerCard player={player} link="/test" />
      </BrowserRouter>
    );
    cy.get("a.player-card").should("have.attr", "href");
    cy.get("#player-picture")
      .should("have.attr", "src")
      .should("include", player.picture.url);
    cy.get("#player-name").should("contains.text", player.firstname);
    cy.get("#player-name").should("contains.text", player.lastname);
    cy.get("#player-age");
    cy.get("#player-rank");
    cy.get("#player-weight");
    cy.get("#player-height");
  });
});
