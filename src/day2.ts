import { readLines } from ".";

export const day2 = async () => {
  const lines = await readLines("puzzle-input/day2-input");
  const lists = lines.map((line) => line.trim().split(/\s+/).map(Number));

  let safe = 0;
  let safeWithSublists = 0;
  lines.forEach((line) => {
    const list = line.trim().split(/\s+/).map(Number);

    const ascSorted = [...list].sort((a, b) => a - b);
    const descSorted = [...list].sort((a, b) => b - a);

    const isAscendingOrDescending =
      ascSorted.every((num, i) => num === list[i]) ||
      descSorted.every((num, i) => num === list[i]);

    const maxDiff = Math.max(
      ...list.slice(1).map((num, i) => Math.abs(num - list[i]))
    );

    const minDiff = Math.min(
      ...list.slice(1).map((num, i) => Math.abs(num - list[i]))
    );

    if (isAscendingOrDescending && minDiff >= 1 && maxDiff <= 3) {
      safe++;
      safeWithSublists++;
    } else {
      // part 2
      const sublists = list.map((_, i) => list.filter((_, j) => j !== i));
      const isSafe = sublists.some((sublist) => {
        const ascSorted = [...sublist].sort((a, b) => a - b);
        const descSorted = [...sublist].sort((a, b) => b - a);
        const maxDiff = Math.max(
          ...sublist.slice(1).map((num, i) => Math.abs(num - sublist[i]))
        );
        const minDiff = Math.min(
          ...sublist.slice(1).map((num, i) => Math.abs(num - sublist[i]))
        );
        return (
          (ascSorted.every((num, i) => num === sublist[i]) ||
            descSorted.every((num, i) => num === sublist[i])) &&
          minDiff >= 1 &&
          maxDiff <= 3
        );
      });
      if (isSafe) {
        safeWithSublists++;
      }
    }
  });

  console.log("safe", safe);
  console.log("safeWithSublists", safeWithSublists);
};
