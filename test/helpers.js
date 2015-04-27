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
    var timeout = test.toString().match(/this\.timeout\((\d+)\)/);
    timeout = timeout ?
      +timeout[1] :
      1999; // because mocha’s default timeout is 2000. We want to fire first.

    setTimeout(function() {
      console.log('WARNING: Flaky test failed to complete');
      flakyDone();
    }, timeout);
    test.call(this, flakyDone);
  };
};

module.exports = {
  once: once,
  flaky: flaky,
};

