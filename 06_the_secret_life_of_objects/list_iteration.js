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

    [Symbol.iterator]() {
        return new ListIterator(this);
    }

}

List.empty = new List();

class ListIterator {
    constructor(list) {
        this.list = list;
    }

    next() {
        if (this.list === List.empty) return {done: true};
        let value = this.list.v;
        this.list = this.list.rest;
        return {value, done: false};
    }
}

// List.prototype[Symbol.iterator] = function () {
//     return new ListIterator(this);
// };

for (let value of List.fromArray(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c