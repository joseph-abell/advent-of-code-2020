const fs = require('fs');

const rawData = fs.readFileSync('./input.txt', 'utf8');
const rows = rawData.split('\n');

const calcTreeCount = ([down, right]) => {
    let slope = 0;
    let trees = 0;

    for (let rowIndex = down; rowIndex < rows.length; rowIndex += down) {
        const row = rows[rowIndex];

        slope = (slope + right) % row.length;

        if (row[slope] === '#') trees++;
    }

    return trees;
}

const part1 = calcTreeCount([1, 3])
const part2 = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
    .reduce((trees, increment) => trees * calcTreeCount(increment), 1);

console.log(part1, part2);
