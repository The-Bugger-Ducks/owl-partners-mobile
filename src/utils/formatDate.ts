export function formatDate(value: string) {
  const date = new Date(value);

  const day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();

  const month =
    date.getMonth() + 1 <= 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;

  return day + "/" + month + "/" + date.getFullYear();
}
