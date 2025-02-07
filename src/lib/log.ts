import { db } from "@/../prisma/index";
import { LogType } from "@prisma/client";

interface Options {
  title: string;
  des?: string;
  amount: number;
  log_type: LogType;
}
export const createLog = async (userId: string, options: Options) => {
  try {
    const { amount, title, des, log_type } = options;
    await db.log.create({
      data: {
        amount,
        title,
        des,
        log_type,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch {
    throw new Error("Unknown Error Try agin");
  }
};
