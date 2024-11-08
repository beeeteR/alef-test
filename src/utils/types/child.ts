import type {IUser} from "@/utils/types/user";

export interface IChild extends IUser{
  parentId: number,
}
