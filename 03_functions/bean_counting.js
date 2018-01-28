/**
 * Serhii Nykyforov
 */
function countChar(str, ch) {
    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === ch) {
            cnt++;
        }
    }
    return cnt;
}

function countBs(str) {
    return countChar(str, 'B')
}


console.log(countBs("BBC.com"));              // 2
console.log(countBs("but because become"));   // 0

console.log(countChar("bbc.com", "c"));              // 2
console.log(countChar("but because become", "e"));   // 4