/*eslint no-console: 0*/

/**
 * Return a function that is only be called once
 * @return {Function}
 */
var once = function(fn) {
  var called = false;
  var result;

  return function() {
    if (called) return result;
    called = true;
    result = fn.apply(null, arguments);
    return result;
  };
};

/**
 * Annotate an asynchronous test as flaky. This will call its
 * final callback regardless of it’s final resting spot.
 * @param {Function} test test function
 * @example
 *    it('should work correctly', flaky(function(done) {
 *      assert.equal(1 + 1, 2, '¯\_(ツ)_/¯');
 *    }));
 */
var flaky = function(test, timeout) {
  return function(done) {
    var flakyDone = once(done);
    setTimeout(function() {
      console.log('WARNING: Flaky test failed to complete');
      flakyDone();
      // 1995 because mocha’s default timeout is 2000 and we want to fire before
      // then in flaky situations
    }, timeout || 1995);
    test(flakyDone);
  };
};

module.exports = {
  once: once,
  flaky: flaky,
};

