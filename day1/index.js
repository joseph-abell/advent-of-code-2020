const fs = require('fs');
const { add, multiply } = require('ramda');

const amountOfNumbersToEqualTotal = 2;

const expenses = fs.readFileSync('./input.txt', 'utf8') // Get data from input.txt file
    .split('\n') // it comes in as one massive blob of data. Split it into multiple lines of text
    .map(n => parseInt(n)); // turn those lines of text into numbers.

let result = -1;

const addedNumbersEqualTotal = (nums, total) => nums.reduce(add, 0) === total;
const multiplyNumbers = (nums) => nums.reduce(multiply, 1);

const recursor = (timesLeftToLoop, cb, nums = []) => {
    if (timesLeftToLoop <= 0) return cb(nums);

    expenses.forEach(a => recursor(timesLeftToLoop - 1, cb, [...nums, a]));
}

recursor(amountOfNumbersToEqualTotal, (nums) => {
    if (addedNumbersEqualTotal(nums, 2020)) {
        result = multiplyNumbers(nums);
    }   
});

console.log(result);