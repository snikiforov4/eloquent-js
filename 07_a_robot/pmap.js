class PMap {

    get(key) {
        return this[key];
    }

    set(key, value) {
        let newMap = Object.assign(new PMap(), this);
        newMap[key] = value;
        return newMap;
    }

    has(key) {
        return key in this;
    }

    delete(key) {
        let newMap = Object.assign(new PMap(), this);
        delete newMap[key];
        return newMap;
    }
}



PMap.empty = Object.freeze(new PMap());

let a = PMap.empty.set("a", 1);
let ab = a.set("b", 2);
let b = ab.delete("a");

console.log(b.get("b"));
// → 2
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false