class List {
    constructor(v, rest) {
        this.v = v;
        this.rest = rest;
    }

    static fromArray(array) {
        let next = List.empty;
        for (let i = array.length - 1; i >= 0; i--) {
            next = new List(array[i], next);
        }
        return next;
    }

    toArray() {
        let arr = [];
        for (let n = this; n !== List.empty; n = n.rest) {
            arr.push(n.v);
        }
        return arr;
    }

    get length() {
        let length = 0;
        for (let n = this; n !== List.empty; n = n.rest) {
            length++;
        }
        return length;
    }

    toString() {
        let res = '[';
        if (this !== List.empty) {
            res += this.v;
            let next = this.rest;
            while (next !== List.empty) {
                res += ', ' + next.v;
                next = next.rest;
            }
        }
        return res + ']';
    }

}

List.empty = new List();


console.log(List.fromArray([]).toString());
console.log(List.fromArray([10, 20, 42]).toString());
console.log(List.fromArray([10, 20, 30]).toArray());
// → [10, 20, 30]
console.log(new List(2, List.empty).length);
// → 1