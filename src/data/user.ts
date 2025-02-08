import { db } from "@/lib/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await db.users.findUnique({ where: { email } });

  if (!user) return null;

  return user;
};

export const findUserById = async (id: string) => {
  const user = await db.users.findUnique({ where: { id } });

  if (!user) return null;

  return user;
};

export const findUserByRef = async (ref: string) => {
  const user = await db.users.findFirst({ where: { my_ref: ref } });

  if (!user) {
    return null;
  }

  return user;
};
