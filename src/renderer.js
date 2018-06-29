function Renderer() {}

Renderer.prototype.render = function (input) {
  var self = this;
  var symbols = [];
  var output = [];

  input.forEach(function (i) {
    var pos = i[0];
    var value = i[1];

    if (value === 'Backspace') {
      symbols.splice(pos - 1, 1);
    } else if (value === 'Delete') {
      symbols.splice(pos, 1);
    } else if (value === 'Enter') {
      symbols.splice(pos, 0, '\n');
    } else {
      symbols.splice(pos, 0, value);
    }

    output.push(symbols.join(''))
  });

  return output;
};

module.exports = Renderer;
