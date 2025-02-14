import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const setDir = (dir: string) =>
  dir === "rtl" ? "flex-row-reverse" : "flex-row";

export const setTextDir = (dir: string) =>
  dir === "rtl" ? "text-right" : "text-left";
// rotate-180
export const setRotateDir = (dir: string) =>
  dir === "rtl" ? "rotate-180" : "";
