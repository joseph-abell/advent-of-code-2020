const fs = require('fs');
const { pipe, add } = require('ramda');

const rawData = fs.readFileSync('./input.txt', 'utf8');
const groups = rawData.split('\n\n');

const getPeople = group => group.split('\n');
const getDuplicatedLetters = people => people.join('').split('');
const dedupeLetters = duplicatedLetters => [...new Set(duplicatedLetters)];
const getLettersSharedByEveryone = (people, letters) => letters.filter(letter => people.every(person => person.includes(letter)))

const anyCount = groups
    .map(group => pipe(getPeople, getDuplicatedLetters, dedupeLetters)(group).length)
    .reduce(add, 0);

const everyCount = groups.map(group => {
    const people = getPeople(group);
    const letters = pipe(getDuplicatedLetters, dedupeLetters)(people);
    return getLettersSharedByEveryone(people, letters).length;
}).reduce(add, 0)

console.log(anyCount, everyCount)