var RESULT_CODES = {
  SUCCESS: 0,
  STOP: 1,
  END: 2,
};

function Renderer() {
  this.playbook = [];
  this.reset();
}

Renderer.prototype.getNext = function () {
  var rendered = this.render();
  var currentSymbol = this.playbook[this.currentIndex - 1];

  if (currentSymbol) {
    this.currentIndex++;

    if (currentSymbol[1] === 'STOP') {
      return {
        output: rendered,
        code: RESULT_CODES.STOP,
      };
    }

    return {
      output: rendered,
      code: RESULT_CODES.SUCCESS,
    };
  }

  return {
    output: rendered,
    code: RESULT_CODES.END,
  };
};

Renderer.prototype.render = function () {
  var symbols = [];

  this.playbook
    .slice(0, this.currentIndex)
    .forEach(function (item) {
      var pos = item[0];
      var value = item[1];

      if (value === 'Backspace') {
        symbols.splice(pos - 1, 1);
      } else if (value === 'Delete') {
        symbols.splice(pos, 1);
      } else if (value === 'Enter') {
        symbols.splice(pos, 0, '\n');
      } else if (value === 'STOP') {
        // skipping...
      } else {
        symbols.splice(pos, 0, value);
      }
    });

  return symbols.join('');
};

Renderer.prototype.setPlaybook = function (playbook) {
  this.reset();
  this.playbook = Array.isArray(playbook) ? playbook : [];
};

Renderer.prototype.reset = function () {
  this.currentIndex = 1;
};

module.exports = Renderer;
