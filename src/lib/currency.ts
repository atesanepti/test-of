export const format = (amount: number, lan: "en-BD" | "bn-BD" = "en-BD") => {
  const formattedBDT = new Intl.NumberFormat(lan, {
    style: "currency",
    currency: "BDT",
  }).format(amount);

  return formattedBDT;
};
