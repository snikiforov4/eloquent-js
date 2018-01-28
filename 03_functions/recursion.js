/**
 * Serhii Nykyforov
 */

/**
  * Another way to define whether a positive whole number is even or odd:
  *
  * - Zero is even
  * - One is odd
  * - For any other number N, its evenness is the same as N - 2
  */
function isEven(n) {
    if (n < 2) {
        return n < 0 ? isEven(-n) : n === 0;
    }
    return isEven(n - 2);
}

console.log(isEven(0));    // true
console.log(isEven(50));   // true
console.log(isEven(75));   // false
console.log(isEven(-33));  // false
console.log(isEven(-42));  // true
