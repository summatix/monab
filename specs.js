/**
 * Loads jasmine unit tests for Node.JS
 *
 * Copyright 2010, Robert Roose (http://robertroose.info/)
 * Licensed under BSD (http://creativecommons.org/licenses/BSD/)
 */

require.paths.unshift(__dirname);
var jasmine = require('jasmine');

for (var key in jasmine) global[key] = jasmine[key];

jasmine.executeSpecsInFolder(__dirname + '/spec', function(runner) {
    process.exit(runner.results().failedCount);
}, false, true);
