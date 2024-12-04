import { readLines } from ".";

export const day4 = async () => {
  const lines = await readLines("puzzle-input/day4-input");
  const grid: string[][] = Array(lines[0].split("").length)
    .fill(null)
    .map(() => Array(lines.length).fill(""));
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y].split("");
    for (let x = 0; x < line.length; x++) {
      grid[y][x] = line[x];
    }
  }
  let xmasCount = 0;

  for (let y = 0; y < lines.length; y++) {
    const lineLength = grid[y].length;
    for (let x = 0; x < lineLength; x++) {
      for (const { dx, dy } of directions) {
        if (isWithinXmasBounds(x, y, dx, dy, lineLength, lines.length)) {
          if (checkXmasSequence(x, y, dx, dy, grid)) {
            xmasCount++;
          }
        }
      }
    }
  }

  console.log("Part 1", xmasCount);

  let masCount = 0;

  for (let y = 0; y < lines.length; y++) {
    const lineLength = grid[y].length;
    for (let x = 0; x < lineLength; x++) {
      const center = grid[y][x];
      if (center === "A") {
        let canBeCentre = true;
        if (x - 1 < 0 || x + 1 > lineLength - 1) {
          // not at an edge
          canBeCentre = false;
        }

        if (y - 1 < 0 || y + 1 > lines.length - 1) {
          // not at an edge
          canBeCentre = false;
        }

        if (canBeCentre) {
          let diag1 = grid[y - 1][x - 1] + grid[y][x] + grid[y + 1][x + 1];
          let diag2 = grid[y + 1][x - 1] + grid[y][x] + grid[y - 1][x + 1];

          if (
            (diag1.split("").reverse().join("") === "MAS" || diag1 === "MAS") &&
            (diag2.split("").reverse().join("") === "MAS" || diag2 === "MAS")
          ) {
            masCount++;
          }
        }
      }
    }
  }

  console.log("Part 2", masCount);

  // Original Messy Part 1 Approach
  // let xmasCount = 0;
  // for (let y = 0; y < lines.length; y++) {
  //   const lineLength = grid[y].length;
  //   for (let x = 0; x < lineLength; x++) {
  //     let lookDown = false;
  //     let lookUp = false;
  //     let lookLeft = false;
  //     let lookRight = false;

  //     if (x - 3 < 0) {
  //       // don't look back horizontally
  //       lookLeft = false;
  //     } else {
  //       lookLeft = true;
  //     }

  //     if (x + 3 > lineLength - 1) {
  //       // don't look forward
  //       lookRight = false;
  //     } else {
  //       lookRight = true;
  //     }

  //     if (y - 3 < 0) {
  //       // don't look up
  //       lookUp = false;
  //     } else {
  //       lookUp = true;
  //     }

  //     if (y + 3 > lines.length - 1) {
  //       // don't look down
  //       lookDown = false;
  //     } else {
  //       lookDown = true;
  //     }

  //     if (lookRight) {
  //       let maybeXmas = // right
  //         grid[y][x] + grid[y][x + 1] + grid[y][x + 2] + grid[y][x + 3];
  //       if (maybeXmas === "XMAS") {
  //         xmasCount++;
  //       }

  //       if (lookDown) {
  //         maybeXmas = // right and down
  //           grid[y][x] +
  //           grid[y + 1][x + 1] +
  //           grid[y + 2][x + 2] +
  //           grid[y + 3][x + 3];
  //         if (maybeXmas === "XMAS") {
  //           xmasCount++;
  //         }
  //       }

  //       if (lookUp) {
  //         maybeXmas = // right and up
  //           grid[y][x] +
  //           grid[y - 1][x + 1] +
  //           grid[y - 2][x + 2] +
  //           grid[y - 3][x + 3];
  //         if (maybeXmas === "XMAS") {
  //           xmasCount++;
  //         }
  //       }
  //     }

  //     if (lookLeft) {
  //       let maybeXmas = // left
  //         grid[y][x] + grid[y][x - 1] + grid[y][x - 2] + grid[y][x - 3];
  //       if (maybeXmas === "XMAS") {
  //         xmasCount++;
  //       }

  //       if (lookDown) {
  //         maybeXmas = // left and down
  //           grid[y][x] +
  //           grid[y + 1][x - 1] +
  //           grid[y + 2][x - 2] +
  //           grid[y + 3][x - 3];
  //         if (maybeXmas === "XMAS") {
  //           xmasCount++;
  //         }
  //       }

  //       if (lookUp) {
  //         maybeXmas = // left and up
  //           grid[y][x] +
  //           grid[y - 1][x - 1] +
  //           grid[y - 2][x - 2] +
  //           grid[y - 3][x - 3];
  //         if (maybeXmas === "XMAS") {
  //           xmasCount++;
  //         }
  //       }
  //     }

  //     if (lookDown) {
  //       let maybeXmas = // down
  //         grid[y][x] + grid[y + 1][x] + grid[y + 2][x] + grid[y + 3][x];
  //       if (maybeXmas === "XMAS") {
  //         xmasCount++;
  //       }
  //     }

  //     if (lookUp) {
  //       let maybeXmas = // up
  //         grid[y][x] + grid[y - 1][x] + grid[y - 2][x] + grid[y - 3][x];
  //       if (maybeXmas === "XMAS") {
  //         xmasCount++;
  //       }
  //     }
  //   }
  // }
};

const directions = [
  { dx: 1, dy: 0 }, // Right
  { dx: -1, dy: 0 }, // Left
  { dx: 0, dy: 1 }, // Down
  { dx: 0, dy: -1 }, // Up
  { dx: 1, dy: 1 }, // Right-Down
  { dx: 1, dy: -1 }, // Right-Up
  { dx: -1, dy: 1 }, // Left-Down
  { dx: -1, dy: -1 }, // Left-Up
];

const isWithinXmasBounds = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  w: number,
  h: number
) => {
  return x + 3 * dx >= 0 && x + 3 * dx < w && y + 3 * dy >= 0 && y + 3 * dy < h;
};

const checkXmasSequence = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  grid: string[][]
) => {
  let sequence = "";
  for (let i = 0; i < 4; i++) {
    sequence += grid[y + i * dy][x + i * dx];
  }
  return sequence === "XMAS";
};
