function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source === "...") return;
    for (let str of yes) {
        if (!regexp.test(str)) {
            console.log(`Failure to match '${str}'`);
        }
    }
    for (let str of no) {
        if (regexp.test(str)) {
            console.log(`Unexpected match for '${str}'`);
        }
    }
}

// 1. car and cat
const re1 = /ca[rt]/;
// 2. pop and prop
const re2 = /pr?op/;
// 3. ferret, ferry, and ferrari
const re3 = /ferr(et|y|ari)/;
// 4. Any word ending in `ious`
const re4 = /\w*ious\b/;
// 5. A whitespace character followed by a dot, comma, colon, or semicolon
const re5 = /\s[.,:;]/;
// 6. A word longer than six letters
const re6 = /\s?\w{7}\s?/;
// 7. A word without the letter e
const re7 = /\b[^e\s]+\b/;

verify(re1,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(re2,
    ["pop culture", "mad props"],
    ["plop"]);

verify(re3,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(re4,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(re5,
    ["bad punctuation ."],
    [";escape the dot,"]);

verify(re6,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(re7,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape"]);
