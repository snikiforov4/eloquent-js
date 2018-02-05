let box = {
    locked: true,
    unlock() { this.locked = false },
    lock() { this.locked = true },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    box.unlock();
    try {
        body();
    } finally {
        box.lock();
    }
}

let putInTheBox = (thing) => () => box.content.push(thing);
let showBoxLoot = () => console.log(box.content);

withBoxUnlocked(putInTheBox("gold piece"));
withBoxUnlocked(putInTheBox("500 diamonds"));
withBoxUnlocked(showBoxLoot);

try {
    withBoxUnlocked(() => { throw new Error("Pirates on the horizon! Abort!") });
} catch (e) {
    console.log(`${e}`);
}

console.log(box.locked);  // → true

