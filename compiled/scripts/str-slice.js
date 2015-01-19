
/*
strSlice

Emphasises letters at regular intervals in a string and produces HTML
output to reflect the results.
 */
var strSlice;

strSlice = (function() {

  /*
  	constructor
  
  	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
   */
  function strSlice() {
    this.target = document.querySelector("#str-slice");
    if (this.target != null) {
      this.interval = this.target.querySelector("input.interval");
      this.offset = this.target.querySelector("input.offset");
      this.len = this.target.querySelector("input.length");
      this.disHi = this.target.querySelector("#strSliceHighlight");
      this.disRe = this.target.querySelector("#strSliceRemove");
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.strip.bind(this), false);
    }
  }


  /*
  	strip
  
  	Performs the character stripping and calls the display method with the results.
   */

  strSlice.prototype.strip = function() {
    var i, interval, offset, results, text, _i, _ref;
    text = this.textarea.value.split("");
    results = text;
    interval = this.interval.valueAsNumber;
    offset = this.offset.valueAsNumber;
    for (i = _i = offset, _ref = text.length - 1; interval > 0 ? _i <= _ref : _i >= _ref; i = _i += interval) {
      results[i] = {
        val: results[i],
        highlight: true
      };
    }
    return this.display(results);
  };


  /*
  	display
  
  	Generates HTML for the given results and inserts it into the page.
  
  	@param results An objects containing the frequency check results.
   */

  strSlice.prototype.display = function(results) {
    var char, html, workLen, _i, _len;
    html = "<p>";
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      char = results[_i];
      if (typeof char === "object") {
        workLen = this.len.valueAsNumber - 1;
        html += "<span class=\"highlight\">" + char.val + "</span>";
      } else if (workLen > 0) {
        workLen--;
        html += "<span class=\"highlight\">" + char + "</span>";
      } else if (this.disHi.checked) {
        html += char;
      }
    }
    html += "</p>";
    return this.resultarea.innerHTML += html;
  };

  return strSlice;

})();
