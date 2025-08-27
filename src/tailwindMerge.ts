import { twMerge, type ClassNameValue } from "tailwind-merge";

export const tailwindMerge = (...classLists: ClassNameValue[]) => {
  return twMerge(...classLists);
};
