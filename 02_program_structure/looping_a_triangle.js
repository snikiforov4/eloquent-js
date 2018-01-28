/**
 * Serhii Nykyforov
 */
const TRIANGLE_SIZE = 7;
var output = '';

// first variant
for (var i = 0; i < TRIANGLE_SIZE; i++) {
    output += '#';
    console.log(output);
}


// second variant
output = '';
while (output.length < TRIANGLE_SIZE) {
    output += '#';
    console.log(output);
}


// third variant
output = '';
do {
    console.log(output);
} while (output.length < TRIANGLE_SIZE && (output += '#'));