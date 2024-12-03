import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";

export const readLines = async (file_path: string) => {
  const lines = await Bun.file(file_path).text();
  return lines.split("\n");
};

export const readFileAsString = async (file_path: string) => {
  const fileData = await Bun.file(file_path).text();
  return fileData;
};

// day1();
// day2();
day3();
