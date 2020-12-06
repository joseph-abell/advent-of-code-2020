const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');
const groups = rawData.split('\n\n');

const add = (a, b) => a + b;
const anyCount = groups
    .map(group => {
        const duplicatedLetters = group.split('\n').join('').split('');
        const letters = [...new Set(duplicatedLetters)]
        return letters.length;
    })
    .reduce(add, 0);

const everyCount = groups.map(group => {
    const people = group.split('\n');
    const duplicatedLetters = people.join('').split('');
    const letters = [...new Set(duplicatedLetters)]
    const lettersEveryoneHas = letters.filter(letter => people.every(person => person.includes(letter)))
    return lettersEveryoneHas.length;
}).reduce(add, 0)

console.log([anyCount, everyCount])