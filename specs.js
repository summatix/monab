require.paths.unshift(__dirname);
var jasmine = require('jasmine'),
    sys = require('sys'),
    isVerbose = false,
    showColors = true;

for (var key in jasmine) global[key] = jasmine[key];

process.argv.forEach(function(arg) {
    switch(arg) {
        case '--color': showColors = true; break;
        case '--noColor': showColors = false; break;
        case '--verbose': isVerbose = true; break;
    }
});

jasmine.executeSpecsInFolder(__dirname + '/spec', function(runner) {
    process.exit(runner.results().failedCount);
}, isVerbose, showColors);
