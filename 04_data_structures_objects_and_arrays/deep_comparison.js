/**
 * Serhii Nykyforov
 */

function isObject(o) {
    return (typeof o === "object") && o != null;
}

function hasSamePropertiesSize(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length;
}

function deepEquals(obj1, obj2) {
    if (!hasSamePropertiesSize(obj1, obj2))
        return false;
    for (var p in obj1) {
        // if (obj1.hasOwnProperty(p)) {
        if (isObject(obj1[p])) {
            if (!deepEquals(obj1[p], obj2[p])) {
                return false;
            }
        } else {
            if (obj1[p] !== obj2[p]) {
                return false;
            }
        }
        // }
    }
    return true;
}


console.log(deepEquals({val1: 1, val2: null}, {val1: 1, val2: null}));      // true
console.log(deepEquals({val1: 1, val2: "String"}, {val1: 1, val2: 2}));     // false
console.log(deepEquals({val1: 1, val2: 2}, {val1: 1, val2: 2, val3: 3}));   // false
console.log();
console.log(deepEquals({val1: 1, val2: {val1: null, val2: "C"}}, {val1: 1, val2: {val1: null, val2: 'C'}}));   // true
console.log(deepEquals({val1: 1, val2: {val1: 1, val2: 2}}, {val1: 1, val2: {val1: 1, val2: '2'}}));           // false
