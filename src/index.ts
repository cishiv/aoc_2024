import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";
import { day4 } from "./day4";
import { day5 } from "./day5";

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
// day3();

// day4();
day5();
