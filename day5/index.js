const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');

const passes = rawData.split('\n');
const passesBinary = passes
    .map(pass => parseInt(pass
        .split('F').join('0')
        .split('B').join('1')
        .split('L').join('0')
        .split('R').join('1'), 2))
    .sort((a, b) => b - a)

const highestPass = passesBinary[0]
console.log(highestPass);