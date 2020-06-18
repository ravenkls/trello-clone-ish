import { User } from "./User.entity";
import { getConnection } from "typeorm";

export const saveUser = async (user: User): Promise<void> => {
  try {
    await user.save();
  } catch (err) {
    if (err.code === "23505") {
      const duplicateKey = err.detail.match(/\((.*?)\)/)[1];
      throw `${duplicateKey} already taken`;
    }
  }
};

export const getUserInfoById = async (userId: number): Promise<User> => {
  const user: User = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: userId })
    .leftJoinAndSelect("user.tasks", "task")
    .leftJoinAndSelect("user.teams", "team")
    .getOne();

  return user;
};
