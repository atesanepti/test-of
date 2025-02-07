import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = (start: number, end: number): number => {
  const number = Math.floor(Math.random() * (end - start + 1)) + start;
  return number;
};
