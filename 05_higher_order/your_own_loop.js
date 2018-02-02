function loop(value, test, update, action) {
    while (test(value)) {
        action(value);
        value = update(value);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);