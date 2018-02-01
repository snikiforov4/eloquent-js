/**
 * Serhii Nykyforov
 */

function isEmpty(arr) {
    return arr && arr.length === 0
}

function arrayToList(arr) {
    if (isEmpty(arr))
        return {e: undefined, rest: null};
    var next = null;
    for (var i = arr.length - 1; i >= 0; i--) {
        next = {e: arr[i], rest: next};
    }
    return next;
}

function printList(list) {
    var res = "[";
    if (list.e !== undefined) {
        res += list.e;
        list = list.rest;
        while (list && list.e !== undefined) {
            res += ", " + list.e;
            list = list.rest;
        }
    }
    return res + "]";
}

function listToArray(list) {
    var arr = [];
    while (list) {
        arr.push(list.e);
        list = list.rest;
    }
    return arr;
}

function prepend(list, e) {
    return {e: e, rest: list};
}

function nth(list, n) {
    if (!list) return undefined;
    if (n === 0) {
        return list.e;
    } else {
        return nth(list.rest, n - 1);
    }
}


console.log(printList(arrayToList([null, 3, 'A'])));
console.log(printList(arrayToList([1, 2, 3])));
console.log(listToArray(arrayToList([1, 2, 3])));
console.log(printList(prepend(arrayToList([1, 2, 3]), 6)));
console.log(nth(arrayToList([1, 2, 3]), 2));    // 3
console.log(nth(arrayToList([1, 2, 3]), 4));    // undefined