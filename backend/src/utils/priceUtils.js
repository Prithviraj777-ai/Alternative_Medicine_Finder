export const sortByPrice = (medicines = []) =>
  [...medicines].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));

export const findCheapest = (medicines = []) => {
  if (!medicines.length) return null;
  return sortByPrice(medicines)[0];
};
