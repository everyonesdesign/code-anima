var assert = require('assert');
var Renderer = require('../src/renderer');

describe('Renderer', function() {
  it('treats letters correctly', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"a"],[1,"b"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'a',
      },
      {
        code: 0,
        output: 'ab',
      },
      {
        code: 2,
        output: 'ab',
      },
      {
        code: 2,
        output: 'ab',
      },
    ]);
  });

  it('allows to reset current playing', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"a"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    renderer.reset();
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'a',
      },
      {
        code: 2,
        output: 'a',
      },
      {
        code: 0,
        output: 'a',
      },
      {
        code: 2,
        output: 'a',
      },
    ]);
  });

  it('pushes letters if the same position is used', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"a"],[0,"b"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'a',
      },
      {
        code: 0,
        output: 'ba',
      },
      {
        code: 2,
        output: 'ba',
      },
    ]);
  });

  it('removes letter by delete', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"c"],[0,"b"],[0,"Delete"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'c',
      },
      {
        code: 0,
        output: 'bc',
      },
      {
        code: 0,
        output: 'c',
      },
      {
        code: 2,
        output: 'c',
      },
    ]);
  });

  it('removes letter by delete', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"c"],[0,"b"],[1,"Backspace"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'c',
      },
      {
        code: 0,
        output: 'bc',
      },
      {
        code: 0,
        output: 'c',
      },
      {
        code: 2,
        output: 'c',
      },
    ]);
  });

  it('adds newline by enter', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"Enter"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: '\n',
      },
      {
        code: 2,
        output: '\n',
      },
    ]);
  });

  it('renders stops correctly', function () {
    var renderer = new Renderer;
    var results = [];

    renderer.setPlaybook([[0,"a"],[null,"STOP"],[1,"b"]]);
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());
    results.push(renderer.getNext());

    assert.deepEqual(results, [
      {
        code: 0,
        output: 'a',
      },
      {
        code: 1,
        output: 'a',
      },
      {
        code: 0,
        output: 'ab',
      },
      {
        code: 2,
        output: 'ab',
      },
    ]);
  });
});
