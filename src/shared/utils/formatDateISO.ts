export function formatDateISO(date: string, hour: string) {
  const year = Number(date.split("/")[2]);
  const month = Number(date.split("/")[1]) - 1;
  const day = Number(date.split("/")[0]);
  const hours = Number(hour.split(":")[0]);
  const minutes = Number(hour.split(":")[1]);

  const formatedDate = new Date(year, month, day, hours, minutes);
  return formatedDate.toISOString();
}
