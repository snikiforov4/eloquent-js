/**
 * Serhii Nykyforov
 */

function reversArray(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.unshift(arr[i]);
    }
    return newArr;
}

function reversArrayInPlace(arr) {
    var mid = Math.floor(arr.length / 2);
    for (var i = 0; i < mid; i++) {
        var temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}


var arr1 = [1, 4, 3, 6, 5, 9];
console.log(arr1);
console.log(reversArray(arr1));
console.log(arr1);
console.log();

var arr2 = [2, 4, 8, 16, 32];
console.log(arr2);
console.log(reversArrayInPlace(arr2));
console.log(arr2);