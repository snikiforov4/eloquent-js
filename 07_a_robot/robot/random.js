function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

exports.randomPick = randomPick;
