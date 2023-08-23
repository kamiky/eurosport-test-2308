import apolloClient from "apollo/client";
import { GetMatchsDocument, GetMatchsQuery } from "api/graphql";

export const getMatches = async (): Promise<GetMatchsQuery["matches"]> => {
  try {
    const response = await apolloClient.query({
      query: GetMatchsDocument,
    });

    if (!response || !response.data)
      throw new Error("Cannot get matches list!");

    return response.data.matches;
  } catch (err) {
    throw err;
  }
};
