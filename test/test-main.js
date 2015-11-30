var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  // Look at your browser's debugging console if you have trouble loading in files via RequireJS
  // (in our case, we are starting Chrome from Karma).
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  // The tests are loaded in asynchronously via RequireJS 
  // so we need to indicate which function to run to kick things off once they have been loaded.
  // i.e. if you don't include this callback, the tests will not run
  // In our case, Mocha will be running the tests and the karma-mocha adapter has mapped the function to
  // kick things off to window.__karma__.start
  callback: window.__karma__.start
});