
/*
subCiph

Performs a character substitution and character set rotation on data in predefined DOM elements.
 */
var subCiph;

subCiph = (function() {

  /*
  	constructor
  
  	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
   */
  function subCiph() {
    this.target = document.querySelector("#sub-ciph");
    if (this.target != null) {
      this.fromAlpha = this.target.querySelector("input.from");
      this.toAlpha = this.target.querySelector("input.to");
      this.rotDirEn = this.target.querySelector("#subCiphEncrypt");
      this.rotDirDe = this.target.querySelector("#subCiphDecrypt");
      this.rotVal = this.target.querySelector("input.rotVal");
      this.rotBut = this.target.querySelector("button.rotBut");
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button:not(.rotBut)");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.sub.bind(this), false);
      this.rotBut.addEventListener("click", this.rotFrom.bind(this), false);
    }
  }


  /*
  	sub
  
  	Performs the character substitution and displays the result on the page.
   */

  subCiph.prototype.sub = function() {
    var i, result, subs, _i, _ref;
    result = this.textarea.value.split("");
    subs = this.getSubs();
    for (i = _i = 0, _ref = result.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      result[i] = subs[result[i]] != null ? subs[result[i]] : result[i];
    }
    return this.resultarea.innerHTML += "<p>" + result.join("") + "</p>";
  };


  /*
  	getSubs
  
  	Generates an object of two characters sets from predefined DOM elements,
  	one is the current character set, the second is the character set to substitute to.
   */

  subCiph.prototype.getSubs = function() {
    var from, num, paceMaker, subs, to, _i, _ref;
    subs = {};
    from = this.fromAlpha.value.split("");
    to = this.toAlpha.value.split("");
    if (from.length !== to.length) {
      paceMaker = from.length < to.value.length ? from.length : to.value.length;
    } else {
      paceMaker = from.length;
    }
    for (num = _i = 0, _ref = paceMaker - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; num = 0 <= _ref ? ++_i : --_i) {
      subs[from[num]] = to[num];
    }
    return subs;
  };


  /*
  	rotFrom
  
  	Performs a character rotation on the character set defined in a predefined DOM element.
  	Depending on the status of form elements on the page, the method will perform a rotation
  	backwards or forwards.
   */

  subCiph.prototype.rotFrom = function() {
    var fromArr, i, _i, _j, _ref, _ref1;
    fromArr = this.fromAlpha.value.split("");
    if (this.rotDirDe.checked) {
      for (i = _i = 0, _ref = this.rotVal.valueAsNumber - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        fromArr.unshift(fromArr.pop());
      }
    } else {
      for (i = _j = 0, _ref1 = this.rotVal.valueAsNumber - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        fromArr.push(fromArr.shift());
      }
    }
    return this.toAlpha.value = fromArr.join("");
  };

  return subCiph;

})();
