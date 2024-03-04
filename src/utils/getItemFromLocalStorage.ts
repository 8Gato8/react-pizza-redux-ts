export const getItemFromLocalStorage = <T>(initialState: T, itemName: string): T => {
  const data = localStorage.getItem(itemName);

  if (data) {
    return JSON.parse(data);
  }

  return initialState;
};
