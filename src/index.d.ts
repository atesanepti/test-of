import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      verified: boolean;
      role: UserRole;
      fullName: string;
      phone: string;
      isBanned: boolean;
    };
  }

  interface Callbacks {
    session({ token, session });
  }
}

declare module "*.mp3";
declare module "*.wav";
