import { readLines } from ".";

export const day1 = async () => {
  const lines = await readLines("puzzle-input/day1-input");
  const left: number[] = [];
  const right: number[] = [];

  for (const line of lines) {
    const [leftNum, rightNum] = line.trim().split(/\s+/).map(Number);
    left.push(leftNum);
    right.push(rightNum);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let total = 0;
  for (let i = 0; i < left.length; i++) {
    total += Math.abs(left[i] - right[i]);
  }

  console.log("distance", total);

  const similarityScore = left.reduce((acc, num) => {
    return acc + right.filter((rightNum) => rightNum === num).length * num;
  }, 0);

  console.log("similarity score", similarityScore);
};
