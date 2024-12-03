import { readFileAsString } from ".";

export const day3 = async () => {
  const fd = await readFileAsString("puzzle-input/day3-input");
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const matches = fd.match(regex);
  if (matches) {
    const part1 = runProgram(matches?.map((v) => v));
    console.log("Part 1", part1);
    const part2 = runProgram(
      matches?.map((v) => v),
      true
    );
    console.log("Part 2", part2);
  }
};

const runProgram = (
  instructions: string[],
  conditionals: boolean = false
): number => {
  let conditional = true;
  let total = 0;
  instructions.forEach((instruction) => {
    if (conditionals) {
      if (instruction === "do()") {
        conditional = true;
      } else if (instruction === "don't()") {
        conditional = false;
      }
    }
    if (conditional && instruction.includes("mul")) {
      let numbers = instruction
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((n) => Number(n));
      total += numbers[0] * numbers[1];
    } else {
      return 0;
    }
  });

  return total;
};
