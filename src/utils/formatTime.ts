export function formatTime(value: string) {
  const date = new Date(value);
  return date.getHours() + ":" + date.getMinutes();
}
