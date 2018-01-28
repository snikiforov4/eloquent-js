/**
 * Serhii Nykyforov
 */
const FIZZ = 'Fizz';
const BUZZ = 'Buzz';
const FIZZ_BUZZ = FIZZ + BUZZ;

// first variant
for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0) {
        console.log(i % 5 === 0 ? FIZZ_BUZZ : FIZZ);
    } else if (i % 5 === 0) {
        console.log(BUZZ);
    } else {
        console.log(i);
    }
}

// second variant
var n = 1;
do {
    var line = '';
    if (n % 3 === 0) {
        line += FIZZ;
    }
    if (n % 5 === 0) {
        line += BUZZ;
    }
    console.log(line || n);
} while (n++ < 100);