const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');

const passes = rawData.split('\n');
const passesBinary = passes
    .map(pass => parseInt(pass
        .split('F').join('0')
        .split('B').join('1')
        .split('L').join('0')
        .split('R').join('1'), 2))
    .sort((a, b) => a - b)

const highestPass = passesBinary[passesBinary.length - 1]
const lowestPass = passesBinary[0];
const missingPass = passesBinary
    .find((pass, passIndex) => { // Finds the pass after the missing pass
        return (pass - lowestPass !== passIndex)
    }) - 1; // - 1 to find the pass number that is missing

console.log(highestPass, missingPass);