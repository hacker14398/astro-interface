const changeISTtoUTC = (date: string) => new Date(date).toUTCString();

export const epochConverter = (date: string) =>
  Math.round(new Date(date).getTime() / 1000.0);

export const changeDateFormat = (date: string) => {
  const dateTime = date.split(" ");
  const dateSplit = dateTime[0].split("-");
  const dateMmDdYyyy =
    dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2] + " " + dateTime[1];
  return dateMmDdYyyy;
};
export const getEpoch = (date: string) =>
  epochConverter(changeISTtoUTC(changeDateFormat(date)));
