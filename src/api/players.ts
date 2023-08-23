import apolloClient from "apollo/client";
import { GetPlayersDocument, GetPlayersQuery } from "api/graphql";

export const getPlayers = async (): Promise<GetPlayersQuery["players"]> => {
  try {
    const response = await apolloClient.query({
      query: GetPlayersDocument,
    });

    if (!response || !response.data)
      throw new Error("Cannot get players list!");

    return response.data.players;
  } catch (err) {
    throw err;
  }
};
