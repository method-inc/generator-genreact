import React from 'react';

exports default function createAsyncHandler(getHandlerAsync, displayName) {
  var Handler = null;

  class AsyncHandler extends React.Component {
    render(): ?ReactElement {
      return (
        <Handler {...this.props} />
      );
    }
  }

  AsyncHandler.displayName = displayName;

  AsyncHandler.willTransitionTo = function(transition, params, query, callback) {
    getHandlerAsync().then(resolvedHandler => {
      Handler = resolvedHandler;

      if (!Handler.willTransitionTo) {
        return callback();
      }

      Handler.willTransitionTo(transition, params, query, callback);
      if (Handler.willTransitionTo.length < 4) {
        callback();
      }
    });
  };

  AsyncHandler.willTransitionFrom = function(transition, component, callback) {
    if (!Handler || !Handler.willTransitionFrom) {
      callback();
    }

    Handler.willTransitionFrom(transition, component, callback);
    if (Handler.willTransitionFrom.length < 3) {
      callback();
    }
  };

  return AsyncHandler;
}

