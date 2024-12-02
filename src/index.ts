import { day1 } from "./day1";
import { day2 } from "./day2";

export const readLines = async (file_path: string) => {
  const lines = await Bun.file(file_path).text();
  return lines.split("\n");
};

// day1();
day2();
