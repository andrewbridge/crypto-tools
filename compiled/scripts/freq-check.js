var freqCheck,
  __hasProp = {}.hasOwnProperty;

freqCheck = (function() {
  function freqCheck() {
    this.target = document.querySelector("#freq-check");
    if (this.target != null) {
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.check.bind(this), false);
    }
  }

  freqCheck.prototype.check = function() {
    var char, results, text, _i, _len, _ref;
    results = {};
    text = this.textarea.value;
    _ref = text.split("");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      char = _ref[_i];
      if (results[char] != null) {
        results[char]++;
      } else {
        results[char] = 1;
      }
    }
    return this.display(results);
  };

  freqCheck.prototype.display = function(results) {
    var char, charStr, freq, freqStr, html, percStr, total;
    charStr = "<thead><tr>";
    freqStr = "<tbody><tr>";
    percStr = "<tr>";
    total = 0;
    for (char in results) {
      if (!__hasProp.call(results, char)) continue;
      freq = results[char];
      charStr += "<td>" + char + "</td>";
      freqStr += "<td>" + freq + "</td>";
      total += freq;
    }
    for (char in results) {
      if (!__hasProp.call(results, char)) continue;
      freq = results[char];
      percStr += "<td>" + Math.round(freq / total * 100) + "%</td>";
    }
    charStr += "</tr></thead>";
    freqStr += "</tr>";
    percStr += "</tr></tbody>";
    html = "<table>" + charStr + freqStr + percStr + "</table>";
    return this.resultarea.innerHTML += html;
  };

  return freqCheck;

})();
