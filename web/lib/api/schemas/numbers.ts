// The API stores Decimal(10,2) for money and stock and Decimal(10,4) for recipe amounts, and
// rejects values with more decimals than the column keeps.
export const hasMaxDecimals = (places: number) => (value: number) => {
  const scaled = value * 10 ** places;
  return Math.abs(Math.round(scaled) - scaled) < 1e-6;
};
