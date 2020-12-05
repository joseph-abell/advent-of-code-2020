const {cleanPassports, validatePassports, yearValidator, heightValidator, hexValidator, colourValidator, idValidator} = require('./index');

const fs = require('fs');
const rawData = fs.readFileSync('./input.txt', 'utf8');

describe('cleanPassports', () => {
    it('turns a string version of a passport into an object', () => {
        const result = cleanPassports(rawData)
        expect(result.length).toEqual(265);
    })
});

describe('validatePassports', () => {
    it('returns 1 valid passport when all required fields exist on a passport', () => {
        const valid = cleanPassports(rawData)[0];
        const result = validatePassports([valid], true);
        expect(result.length).toEqual(1)
    });
})

describe('yearValidator', () => {
    it('returns false when passed a number lower than the min', () => {
        const result = yearValidator(1001, 9999)("1000");
        expect(result).toEqual(false);
    });

    it('returns false when passed a number higher than the max', () => {
        const result = yearValidator(1000, 9998)("9999");
        expect(result).toEqual(false);
    });

    it('returns true when passed a number in between the min and the max', () => {
        const result = yearValidator(1000, 9999)("5000");
        expect(result).toEqual(true);
    });

    it('returns true when passed a number equal to the min', () => {
        const result = yearValidator(1000, 9999)("1000");
        expect(result).toEqual(true);
    });

    it('returns true when passed a number equal to the max', () => {
        const result = yearValidator(1000, 9999)("9999");
        expect(result).toEqual(true);
    });

    it('returns false when passed a number that has less than 4 digits', () => {
        const result = yearValidator(100, 999)("999");
        expect(result).toEqual(false);
    })

    it('returns false when passed a number that has greater than 4 digits', () => {
        const result = yearValidator(10000, 99999)("99999");
        expect(result).toEqual(false);
    })
})

describe('heightValidator', () => {
    it('returns false when passed a string that is not in cm or in', () => {
        const result = heightValidator(1, 2, 1, 2)('2');
        expect(result).toEqual(false);
    });

    it('returns false when passed a string is in cm but is less than min', () => {
        const result = heightValidator(1, 2, 1, 2)('0cm');
        expect(result).toEqual(false);
    });

    it('returns false when passed a string is in cm but is greater than max', () => {
        const result = heightValidator(1, 2, 1, 2)('3cm');
        expect(result).toEqual(false);
    });

    it('returns true when passed a string is in cm but is equal to min', () => {
        const result = heightValidator(1, 2, 1, 2)('1cm');
        expect(result).toEqual(true);
    });

    it('returns true when passed a string is in cm but is equal to max', () => {
        const result = heightValidator(1, 2, 1, 2)('2cm');
        expect(result).toEqual(true);
    });

    it('returns true when passed a string is in cm and is in between min and max', () => {
        const result = heightValidator(1, 3, 1, 3)('2cm');
        expect(result).toEqual(true);
    });

    it('returns false when passed a string is in in but is less than min', () => {
        const result = heightValidator(1, 2, 1, 2)('0in');
        expect(result).toEqual(false);
    });

    it('returns false when passed a string is in in but is greater than max', () => {
        const result = heightValidator(1, 2, 1, 2)('3in');
        expect(result).toEqual(false);
    });

    it('returns true when passed a string is in in but is equal to min', () => {
        const result = heightValidator(1, 2, 1, 2)('1in');
        expect(result).toEqual(true);
    });

    it('returns true when passed a string is in in but is equal to max', () => {
        const result = heightValidator(1, 2, 1, 2)('2in');
        expect(result).toEqual(true);
    });

    it('returns true when passed a string is in in and is in between min and max', () => {
        const result = heightValidator(1, 3, 1, 3)('2in');
        expect(result).toEqual(true);
    });
})

describe('hexValidator', () => {
    it('returns false when passed a string that does not start with a hash', () => {
        const result = hexValidator('');
        expect(result).toEqual(false)

        const result2 = hexValidator('1234ab');
        expect(result2).toEqual(false)
    })

    it('returns false when given a string which is not a hex value', () => {
        const result = hexValidator('#g');
        expect(result).toEqual(false)
    })

    it('returns true when given a string which is a hex value', () => {
        const result = hexValidator('#123abc');
        expect(result).toEqual(true)
    })

    it('returns false when given a hex value that has less than 6 characters', () => {
        const result = hexValidator('#123ab');
        expect(result).toEqual(false)
    })

    it('returns false when given a hex value that has greater than 6 characters', () => {
        const result = hexValidator('#123abcd');
        expect(result).toEqual(false)
    })
})

describe('colourValidator', () => {
    it('returns false when passed an empty string', () => {
        const result = colourValidator(['a'])('');
        expect(result).toEqual(false);
    })

    it('returns false when passed a string which does not match a colour', () => {
        const result = colourValidator(['a'])('b');
        expect(result).toEqual(false);
    })

    it('returns true when passed a string which matches a colour', () => {
        const result = colourValidator(['a'])('a');
        expect(result).toEqual(true);
    })
})

describe('idValidator', () => {
    it('returns false when passed an empty string', () => {
        const result = idValidator('');
        expect(result).toEqual(false)
    })

    it('returns false when passed an empty string with a number of less that 9 characters', () => {
        const result = idValidator('00000000');
        expect(result).toEqual(false)
    })

    it('returns true when passed an empty string equal to 9 characters', () => {
        const result = idValidator('000000000');
        expect(result).toEqual(true)
    })
})