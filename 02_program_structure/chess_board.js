/**
 * Serhii Nykyforov
 */
const BLACK = '#';
const WHITE = ' ';
var startWithWhite = true;


for (var i = 0; i < 8; i++) {
    var line = '';
    for (var j = 0; j < 8; j++) {
        var cellColour = (i + j + startWithWhite) % 2 === 0;
        line += cellColour ? BLACK : WHITE;
    }
    console.log(line);
}