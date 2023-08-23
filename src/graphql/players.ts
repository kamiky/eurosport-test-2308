import { gql } from "@apollo/client";

export const PLAYER_LIST = gql`
  query getPlayers {
    players {
      id
      firstname
      lastname
      shortname
      sex
      country {
        picture {
          url
        }
        code
      }
      stats {
        rank
        points
        weight
        height
        age
      }
      picture {
        url
      }
    }
  }
`;
