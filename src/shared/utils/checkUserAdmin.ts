import { RoleEnum } from "@interfaces/user.interface";
import StorageController from "./handlers/StorageController";

export async function checkUserAdmin() {
  const user = await StorageController.getUserInfo();
  if (!user) {
    alert("Usuário não encontrado");
    return false;
  }
  return user.role === RoleEnum.ADMIN;
}
