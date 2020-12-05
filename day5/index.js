const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');

const passesBin = rawData.split('\n');
const passesDec = passesBin.map(pass => parseInt(
    pass.split('F').join('0')
        .split('B').join('1')
        .split('L').join('0')
        .split('R').join('1'),
    2
)).sort((a, b) => a - b)

const highestPass = passesDec[passesDec.length - 1]
const lowestPass = passesDec[0];
const passAfterMissingPass = passesDec.find((pass, passIndex) => (pass - lowestPass !== passIndex))
const missingPass = passAfterMissingPass - 1;
console.log(highestPass, missingPass);