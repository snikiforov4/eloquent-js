const number = /^[-+]?((\d+\.?\d*)|(\d*\.?\d+))(e[-+]?\d+)?$/i;


["1", "-1", "+15", "1.55", ".5", "-.5", "5.", "1.3e2", "1E-4", "1e+12"].forEach(s => {
    if (!number.test(s))
        console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."].forEach(s => {
    if (number.test(s))
        console.log("Incorrectly accepted '" + s + "'");
});
