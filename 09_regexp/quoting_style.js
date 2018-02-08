
let text = "'I'm the cook,' he said, 'it's my job.'";
const shouldBe = "\"I'm the cook,\" he said, \"it's my job.\"";

console.log("Actual:  ", (text = text.replace(/(\W)'|^'|'(\W)|^$/g, "$1\"$2")));
console.log("Expected:", shouldBe);
console.log(shouldBe === text);