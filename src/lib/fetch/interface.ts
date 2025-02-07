export type CricketEvent = {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
};

export interface Outcome {
  label: string;
  price: number;
  points?: number | null;
}

interface Market {
  key: "h2h" | "spreads" | "totals" | "outrights";
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  title: string;
  last_update: number;
  markets: Market[];
}

interface Matches {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team?: string | null;
  away_team?: string | null;
  bookmakers: Bookmaker[];
}

export type MatchesList = Matches[];

export type MatchesListResponse = {
  key: string;
  name: string;
  odds: Outcome[];
  homeTeam: string;
  awayTeam: string;
};
