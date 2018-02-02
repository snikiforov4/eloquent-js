// first variant using for loop
let every0 = function every(array, test) {
    for (let e of array) {
        if (!test(e)) return false;
    }
    return true;
};

// second variant using some method
let every = function every(array, test) {
    return !array.some(v => !test(v));
};

console.log(every([1, 3, 5], n => n < 10));   // → true
console.log(every([2, 4, 16], n => n < 10));  // → false
console.log(every([], n => n < 10));          // → true

