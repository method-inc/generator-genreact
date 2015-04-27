/*global jest:true, describe: true, it: true*/

jest.dontMock('../index.js');
describe('<%= ComponentName %>', function() {
  it('changes the text after click', function() {
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var <%= ComponentName %> = require('../index.js');

    // Render a <%= ComponentName %> in the document
    var <%= ComponentName %>Test = TestUtils.renderIntoDocument(
      <<%= ComponentName %> />
    );
  });
});
