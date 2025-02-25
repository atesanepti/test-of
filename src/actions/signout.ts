"use server";

import { signOut } from "@/auth";

export const signoutApi = async () => {
  try {
    
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    console.log({error})
    return { error: "Somethink went wrong" };
  }
};
