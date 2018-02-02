function flattening(array) {
    return array.reduce((p, c) => p.concat(c), []);
}

console.log(flattening([[1, 2, 3], [4, 5], [6]]));
console.log(flattening([]));