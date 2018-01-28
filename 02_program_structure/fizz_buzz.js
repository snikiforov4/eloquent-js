/**
 * Serhii Nykyforov
 */
const FIZZ = 'Fizz';
const BUZZ = 'Buzz';
const FIZZ_BUZZ = FIZZ + BUZZ;

for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0) {
        console.log(i % 5 === 0 ? FIZZ_BUZZ : FIZZ);
    } else if (i % 5 === 0) {
        console.log(BUZZ);
    } else {
        console.log(i);
    }
}