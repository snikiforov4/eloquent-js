/**
 * Serhii Nykyforov
 */

function range(start, end, step) {
    const direction = end - start;
    // TODO if step defined check that it has correct sign according to direction
    if (!step) {
        step = 1;
    }
    function isInRange(e) {
        if (direction > 0) {
            return e <= end;
        } else {
            return e >= end;
        }
    }
    var arr = [];
    for (var e = start; isInRange(e); e += step) {
        arr.push(e);
    }
    return arr;
}

function sum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

console.log(sum(range(1, 10)));     // 55
console.log(sum(range(1, 10, 2)));  // 25
console.log(sum(range(5, 2, -1)));  // 14
console.log(sum(range(6, -3, -3))); // 6
console.log(sum(range(-10, 0, 1))); // -55