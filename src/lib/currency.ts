export const format = (amount: number) => {
  const formattedBDT = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(amount);

  return formattedBDT;
};
