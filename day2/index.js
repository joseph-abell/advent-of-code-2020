const fs = require('fs');

const rawData = fs.readFileSync('./input.txt', 'utf8');
const getData = (rawData) => rawData.split('\n');
const getLetter = (line) => line.split(':')[0].split(' ')[1]
const getCounts = line => line.split(' ')[0].split('-');
const getPassword = line => line.split(' ')[2]
const splitData = line => ([getLetter(line), getPassword(line), ...getCounts(line) ]);

const answer1 = getData(rawData)
    .map(line => {
        const [letter, password, minCount, maxCount] = splitData(line);
        if (maxCount === undefined) return false;

        let letterCount = 0;

        password.split('').forEach(l => {
            if (l === letter) letterCount += 1;
        })

        if (letterCount >= minCount && letterCount <= maxCount) return true;
        return false;
    })
    .filter(line => line)
    .length;

const answer2 = getData(rawData)
    .map(line => {
        const [letter, password, firstIndex, secondIndex] = splitData(line);
        if (secondIndex === undefined) return false;

        const i1 = firstIndex - 1;
        const i2 = secondIndex - 1;

        if (password[i1] === letter && password[i2] !== letter) return true;
        if (password[i1] !== letter && password[i2] === letter) return true;
    })
    .filter(line => line)
    .length;

console.log(answer1);
console.log(answer2);