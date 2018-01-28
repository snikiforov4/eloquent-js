/**
 * Serhii Nykyforov
 */
const TRIANGLE_SIZE = 7;
const UNIT = '#';
var output = '';

// FOR first variant
for (var i = 0; i < TRIANGLE_SIZE; i++) {
    output += UNIT;
    console.log(output);
}

// FOR second variant
for (var line = ''; line.length <= TRIANGLE_SIZE;) {
    console.log(line += UNIT);
}


// WHILE variant
output = '';
while (output.length < TRIANGLE_SIZE) {
    output += UNIT;
    console.log(output);
}


// DO WHILE variant
output = '';
do {
    console.log(output);
} while (output.length < TRIANGLE_SIZE && (output += UNIT));
