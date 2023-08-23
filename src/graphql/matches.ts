import { gql } from "@apollo/client";

export const MATCH_LIST = gql`
  query getMatchs {
    matches {
      id
      players {
        id
        firstname
        lastname
      }
      winner {
        id
      }
      startTime
      endTime
    }
  }
`;
