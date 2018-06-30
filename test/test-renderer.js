var assert = require('assert');
var Renderer = require('../src/renderer');

describe('Renderer', function() {
  it('adds letters', function () {
    var renderer = new Renderer;

    var output = renderer.render([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);

    assert.deepEqual(output, [
      'a',
      'ab',
      'abc',
    ]);
  });

  it('pushes letters if the same position is used', function () {
    var renderer = new Renderer;

    var output = renderer.render([
      [0, 'c'],
      [0, 'b'],
      [0, 'a'],
    ]);

    assert.deepEqual(output, [
      'c',
      'bc',
      'abc',
    ]);
  });

  it('removes letter by delete', function () {
    var renderer = new Renderer;

    var output = renderer.render([
      [0, 'c'],
      [0, 'b'],
      [0, 'Delete'],
    ]);

    assert.deepEqual(output, [
      'c',
      'bc',
      'c',
    ]);
  });

  it('removes letter by backspace', function () {
    var renderer = new Renderer;

    var output = renderer.render([
      [0, 'c'],
      [0, 'b'],
      // position is different due to cursor position
      [1, 'Backspace'],
    ]);

    assert.deepEqual(output, [
      'c',
      'bc',
      'c',
    ]);
  });

  it('adds newline by enter', function () {
    var renderer = new Renderer;

    var output = renderer.render([
      [0, 'Enter'],
    ]);

    assert.deepEqual(output, [
      '\n',
    ]);
  });

  it('renders as clean function', function () {
    var renderer = new Renderer;

    renderer.render([
      [0, 'a'],
      [1, 'b'],
    ]);

    var output = renderer.render([
      [0, 'a'],
      [1, 'b'],
    ]);

    assert.deepEqual(output, [
      'a',
      'ab',
    ]);
  });

  it('doesnt render stops', function () {
    var renderer = new Renderer;

    renderer.render([
      [0, 'a'],
      [null, 'STOP'],
    ]);

    var output = renderer.render([
      [0, 'a'],
    ]);

    assert.deepEqual(output, [
      'a',
    ]);
  });
});
