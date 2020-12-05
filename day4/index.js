const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');

const yearValidator = (min, max) => (value) => {
    const numVal = parseInt(value);

    if (
        value.length !== 4 ||
        numVal < min ||
        numVal > max
    ) return false;
    
    return true;
}

const heightValidator = (cmMin, cmMax, inMin, inMax) => value => {
    const isCm = value.substring(value.length - 2) === 'cm';
    const isIn = value.substring(value.length - 2) === 'in';
    if (!isCm && !isIn) return false;

    const numVal = parseInt(value.split('cm').join('').split('in').join(''));
    if (isCm && (numVal < cmMin || numVal > cmMax)) return false;
    if (isIn && (numVal < inMin || numVal > inMax)) return false;
    return true;
}

const hexValidator = value => {
    if (!value.startsWith('#')) return false;
    const noHash = value.split('#').join('');
    var intVal = parseInt(noHash, 16);

    if (intVal.toString(16) !== noHash) return false;
    if (value.length !== 7) return false;
    return true;
}

const colourValidator = colours => value => colours.includes(value);

const idValidator = value => {
    if (isNaN(parseInt(value))) return false;
    if (value.length !== 9) return false;
    return true;
}

const requiredFields = {
    byr: yearValidator(1920, 2002),
    iyr: yearValidator(2010, 2020),
    eyr: yearValidator(2020, 2030),
    hgt: heightValidator(150, 193, 59, 76),
    hcl: hexValidator,
    ecl: colourValidator(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']),
    pid: idValidator,
};

const cleanPassports = (passports) => passports.split('\n\n').map(passport => {
    const entries = passport
        .split('\n')
        .flatMap(line => line.split(' '))
        .reduce((acc, i) => {
            const [key, value] = i.split(':');

            return {
                ...acc,
                [key]: value
            }
        }, {});

    return entries;
});

const validatePassports = (cleanedPassports, simple = true) => cleanedPassports.filter(passport => {
    const keys = Object.keys(passport);

    let valid = true;

    if (!Object.keys(requiredFields).every(requiredField => keys.includes(requiredField))) valid = false;

    if (simple) return valid;

    Object.entries(passport).forEach(([key, value]) => {
        if (key === 'cid') return;

        const validator = Object.entries(requiredFields).find(([k]) => k === key)[1];
        const isFieldValid = validator(value);
        if (!isFieldValid) valid = false;
    });

    return valid;
});

const cleanedPassports = cleanPassports(rawData);
const validPassports = validatePassports(cleanedPassports, false);
console.log(validPassports.length);

module.exports = {
    cleanPassports,
    validatePassports,
    yearValidator,
    heightValidator,
    hexValidator,
    colourValidator,
    idValidator
};