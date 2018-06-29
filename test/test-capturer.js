var assert = require('assert');
var Capturer = require('../src/capturer');

describe('Capturer', function() {
  describe('#getCaptured', function () {
    it('returns captured symbols', function () {
      var capturer = new Capturer;
      capturer.captured = [
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ];

      assert.deepEqual(capturer.getCaptured(), [
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ]);
    });
  });

  describe('#capture', function () {
    it('is bound to the instance', function () {
      // because can be used as events listener
      var capturer = new Capturer;
      var func = function () {
        capturer.capture.call(null, {
          key: 'a',
          target: {
            selectionStart: 0,
            selectionEnd: 0,
          },
        });
      };

      assert.doesNotThrow(func);
    });

    it('captures letters', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: 'a',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      capturer.capture({
        key: 'b',
        target: {
          selectionStart: 1,
          selectionEnd: 1,
        },
      });

      capturer.capture({
        key: 'c',
        target: {
          selectionStart: 2,
          selectionEnd: 2,
        },
      });

      assert.deepEqual(capturer.getCaptured(), [
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ]);
    });

    it('captures backspace/delete', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: 'Backspace',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      capturer.capture({
        key: 'Delete',
        target: {
          selectionStart: 1,
          selectionEnd: 1,
        },
      });

      assert.deepEqual(capturer.getCaptured(), [
        [0, 'Backspace'],
        [1, 'Delete'],
      ]);
    });

    it('captures enter', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: 'Enter',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      assert.deepEqual(capturer.getCaptured(), [
        [0, 'Enter'],
      ]);
    });

    it('captures space', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: ' ',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      assert.deepEqual(capturer.getCaptured(), [
        [0, ' '],
      ]);
    });

    it('ignores Shirt, Ctrl, etc.', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: 'Shift',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      capturer.capture({
        key: 'Ctrl',
        target: {
          selectionStart: 0,
          selectionEnd: 0,
        },
      });

      assert.deepEqual(capturer.getCaptured(), []);
    });

    it('gets cursor position while capturing', function () {
      var capturer = new Capturer;

      capturer.capture({
        key: 'a',
        target: {
          selectionStart: 1,
          selectionEnd: 1,
        },
      });

      assert.deepEqual(capturer.getCaptured(), [
        [1, 'a'],
      ]);
    });

    it('prevents event with selection', function () {
      var capturer = new Capturer;
      var preventIsCalled = false;

      capturer.capture({
        key: 'a',
        target: {
          selectionStart: 1,
          selectionEnd: 2,
        },
        preventDefault: function () {
          preventIsCalled = true;
        },
      });

      assert.equal(preventIsCalled, true);
      assert.deepEqual(capturer.getCaptured(), []);
    });

    it('prevents backspace with additional keys', function () {
      var capturer = new Capturer;
      var preventIsCalled = 0;

      var getEvent = function(additionalKey) {
        var event = {
          key: 'Backspace',
          altKey: true,
          target: {
            selectionStart: 1,
            selectionEnd: 1,
          },
          preventDefault: function () {
            preventIsCalled++;
          },
        };
        event[additionalKey] = true;
        return event;
      };

      var keys = ['shiftKey', 'altKey', 'metaKey', 'ctrlKey'];

      for (var i = 0; i < 4; i++) {
        capturer.capture(getEvent(keys[i]));
      }

      assert.equal(preventIsCalled, 4);
      assert.deepEqual(capturer.getCaptured(), []);
    });
  });
});
