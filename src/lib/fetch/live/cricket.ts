
import fetchData from "../fetch";
import { CricketEvent, MatchesList } from "../interface";

const API = process.env.ODDS_API!;
const API_KEY = process.env.ODDS_API_KEY!;
const API_HOST = process.env.ODDS_HOST!;

export const findLiveCricketEvents = async () => {
  const result = await fetchData<CricketEvent[]>(`${API}/v4/sports?all=true`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  });

  const activeEvents = result.filter((e) => {
    if (e.active && e.group === "Cricket") {
      return { key: e.key, name: e.title };
    }
  });

  return activeEvents;
};

export const findLiveCricketMatchs = async (event: string | string[]) => {
  if (Array.isArray(event)) {
    // matchs = event.map(async (e) => {
    //   return await fetchData<MatchesList>(
    //     `${API}/v4/sports/${e}/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFormat=iso`
    //   );
    // });
    // // matchs = matchs.flat();
    // matchs[0]
    // matchs = [];
  } else {
    const matches = await fetchData<MatchesList>(
      `https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFormat=iso`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );
    console.log({ matches });
    const filteredMatches = matches.map((m) => {
      return {
        key: m.sport_key,
        name: m.sport_title,
        odds: m.bookmakers[0].markets[0].outcomes,
        homeTeam: m.home_team,
        awayTeam: m.away_team,
      };
    });
    return filteredMatches;
  }
};
