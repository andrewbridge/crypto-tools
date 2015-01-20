
/*
matrixLayer

Produces an HTML table or "matrix" to help visualise a ciphertext encrypted with a transposition
cipher.
 */
var matrixLayer;

matrixLayer = (function() {

  /*
  	constructor
  
  	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
   */
  function matrixLayer() {
    this.target = document.querySelector("#matrix-layer");
    if (this.target != null) {
      this.order = this.target.querySelector("input.order");
      this.cols = this.target.querySelector("input.length");
      this.colDirEn = this.target.querySelector("#matLayEncrypt");
      this.colDirDe = this.target.querySelector("#matLayDecrypt");
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.lay.bind(this), false);
    }
  }


  /*
  	lay
  
  	Lays the text into the matrix.
   */

  matrixLayer.prototype.lay = function() {
    var columns, i, matrix, n, pos, rows, text, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3;
    text = this.textarea.value.split("");
    pos = 0;
    columns = this.cols.valueAsNumber;
    rows = Math.ceil(text.length / columns);
    matrix = [];
    if (this.colDirEn.checked) {
      for (i = _i = 0, _ref = rows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (n = _j = 0, _ref1 = columns - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; n = 0 <= _ref1 ? ++_j : --_j) {
          if (matrix[i] == null) {
            matrix[i] = [];
          }
          matrix[i][n] = text[pos];
          pos++;
        }
      }
    } else {
      for (i = _k = 0, _ref2 = columns - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        for (n = _l = 0, _ref3 = rows - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; n = 0 <= _ref3 ? ++_l : --_l) {
          if (matrix[n] == null) {
            matrix[n] = [];
          }
          matrix[n][i] = text[pos];
          pos++;
        }
      }
    }
    return this.display(matrix);
  };


  /*
  	display
  
  	Generates HTML for the given results and inserts it into the page.
  
  	@param results An objects containing the frequency check results.
   */

  matrixLayer.prototype.display = function(results) {
    var cell, column, html, order, pos, text, tmp, _i, _j, _k, _len, _len1, _len2;
    html = "<table><tbody>";
    text = "";
    order = this.order.value.split("");
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      column = results[_i];
      html += "<tr>";
      tmp = "";
      for (_j = 0, _len1 = column.length; _j < _len1; _j++) {
        cell = column[_j];
        html += "<td>" + cell + "</td>";
        tmp += cell;
      }
      if (order.length === this.cols.valueAsNumber) {
        for (_k = 0, _len2 = order.length; _k < _len2; _k++) {
          pos = order[_k];
          text += column[parseInt(pos) - 1];
        }
      } else {
        text += tmp;
      }
      html += "</tr>";
    }
    html += "</tbody></table><p>" + text + "</p>";
    return this.resultarea.innerHTML += html;
  };

  return matrixLayer;

})();
