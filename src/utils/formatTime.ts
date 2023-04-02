export function formatTime(value: string) {
  const date = new Date(value);
  return (
    date.getHours() +
    ":" +
    (date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`)
  );
}
