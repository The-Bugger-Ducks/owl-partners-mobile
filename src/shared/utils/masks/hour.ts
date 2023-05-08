export function hourMask(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d{2})(\d{2})+?$/, "$1:$2");
}
