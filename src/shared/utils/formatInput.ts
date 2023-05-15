import { cepMask } from "./masks/cep";
import { dateMask } from "./masks/date";
import { hourMask } from "./masks/hour";
import { phoneMask } from "./masks/phone";

export function formatInput(
  value: string,
  mask: "CEP" | "date" | "phone" | "hour",
) {
  if (mask === `CEP`) return cepMask(value);
  if (mask === `phone`) return phoneMask(value);
  if (mask === `date`) return dateMask(value);
  if (mask === `hour`) return hourMask(value);
  return value;
}
