const getDateParam = (): string => {
  const today = new Date();

  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const day = today
    .getDate()
    .toString()
    .padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default getDateParam;
