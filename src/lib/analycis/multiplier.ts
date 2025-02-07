import { BetResult, Prisma } from "@prisma/client";

export const userRecords = (
  history: Prisma.multiplierHistoryDataGetPayload<object>[]
) => {
  const totalWonRound = history.filter((h) => h.result === BetResult.PROFILT);

  const totalLostRound = history.filter((h) => h.result === BetResult.LOSS);

  const totalWon = totalWonRound.reduce((acc, h) => {
    return h.profit! + acc;
  }, 0);

  const totalLost = totalLostRound.reduce((acc, h) => {
    return h.base_amount! + acc;
  }, 0);

  const totalBetAmount = history.reduce((acc, h) => {
    return h.base_amount + acc;
  }, 0);

  const state = { winingRate: 0, losingRate: 0 };

  if (totalWon > totalLost) {
    state.winingRate = (totalWon - totalBetAmount) * (100 / totalBetAmount);
  } else if (totalWon < totalLost) {
    state.losingRate = totalLost * (100 / totalBetAmount);
  }

  return state;
};
