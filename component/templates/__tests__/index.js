jest.dontMock('../index.js');
describe('<%= ComponentName %>', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var <%= ComponentName %> = require('../index.js');
    var TestUtils = React.addons.TestUtils;

    // Render a <%= ComponentName %> in the document
    var <%= ComponentName %>Test = TestUtils.renderIntoDocument(
      <<%= ComponentName %> labelOn="On" labelOff="Off" />
    );

  });
});