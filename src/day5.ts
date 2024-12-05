import { readLines } from ".";

export const day5 = async () => {
  const lines = await readLines("puzzle-input/day5-input");

  const rules: string[] = [];
  const updates: string[] = [];

  lines.forEach((line) => {
    if (line.includes("|")) rules.push(line);
    if (line.includes(",")) updates.push(line);
  });

  let sum = 0;
  updates.forEach((update) => {
    const vu = part1_SumValidUpdateMidpoints(update, rules);
    sum += vu;
  });

  let sumAll = 0;
  updates.forEach((update) => {
    const sortedUpdate = part2_Swap(update, rules);
    sumAll += part1_SumValidUpdateMidpoints(sortedUpdate, rules);
  });
  console.log("Part 1", sum);
  console.log("Part 2", sumAll - sum);
};

const part2_Swap = (update: string, rules: string[]) => {
  const updateParts = update.split(",");
  for (let i = 0; i < updateParts.length; i++) {
    for (let j = i + 1; j < updateParts.length; j++) {
      if (
        rules.some((rule) => rule === updateParts[j] + "|" + updateParts[i])
      ) {
        let sortedArray = swap(updateParts, i, j);
        return part2_Swap(sortedArray.join(","), rules);
      } else {
        continue;
      }
    }
  }
  return update;
};

const swap = (arr: string[], i: number, j: number) => {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
    throw new Error("Invalid indices");
  }

  return arr.map((element, index) => {
    if (index === i) return arr[j];
    if (index === j) return arr[i];
    return element;
  });
};

const part1_SumValidUpdateMidpoints = (
  update: string,
  rules: string[]
): number => {
  const updateParts = update.split(",");
  let valid = false;
  for (let i = 0; i < updateParts.length; i++) {
    const validPairs: string[] = [];
    const invalidPairs: string[] = [];
    for (let j = i + 1; j < updateParts.length; j++) {
      validPairs.push(updateParts[i] + "|" + updateParts[j]);
      invalidPairs.push(updateParts[j] + "|" + updateParts[i]);
    }

    if (rules.some((rule) => invalidPairs.includes(rule))) {
      valid = false;
      break;
    } else {
      if (validPairs.every((element) => rules.includes(element))) {
        valid = true;
      } else {
        valid = false;
        break;
      }
    }
  }
  return valid ? midpoint(updateParts) : 0;
};

const midpoint = (arr: string[]): number => {
  if (arr.length === 0) return 0;

  const midIndex = Math.floor(arr.length / 2);

  return Number(arr[midIndex]);
};
