import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = (start: number, end: number): number => {
  const number = Math.floor(Math.random() * (end - start + 1)) + start;
  return number;
};

export const getPublicId = (imageUrl: string) => {
  const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
  const match = imageUrl.match(regex);
  return match ? match[1] : null;
};

export function getBlurredCloudinaryURL(originalURL: string): string {
  if (!originalURL.includes("/upload/")) {
    console.error("Invalid Cloudinary URL");
    return originalURL;
  }

  return originalURL.replace(
    "/upload/",
    "/upload/w_20,h_20,c_scale,e_blur:50/"
  );
}
