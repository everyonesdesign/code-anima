var allowedSpecial = [
  'Enter',
  'Backspace',
  'Delete',
];

var specialKeys = [
  'shiftKey',
  'altKey',
  'metaKey',
  'ctrlKey'
];

function Capturer() {
  this.captured = [];
  this.capture = this.capture.bind(this);
}

Capturer.prototype.getCaptured = function (input) {
  return this.captured;
};

Capturer.prototype.capture = function (e) {
  if (this.validateKey(e.key)) {
    if (e.target.selectionStart !== e.target.selectionEnd) {
      e.preventDefault();
      return;
    }

    var specialKeyPressed = specialKeys.some(function (k) {return e[k]});
    if (e.key === 'Backspace' && specialKeyPressed) {
      e.preventDefault();
      return;
    }

    this.captured.push([e.target.selectionStart, e.key]);
  }
};

Capturer.prototype.validateKey = function (key) {
  // letter or space
  if (key.length === 1) {
    return true;
  } else if (allowedSpecial.includes(key)) {
    return true;
  }

  return false;
};

Capturer.prototype.addStop = function () {
  this.captured.push([null, 'STOP']);
};

module.exports = Capturer;
