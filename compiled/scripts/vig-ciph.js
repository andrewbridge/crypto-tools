
/*
vigCiph

Performs a character substitution based on a given key.
 */
var vigCiph;

vigCiph = (function() {

  /*
  	constructor
  
  	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
   */
  function vigCiph() {
    this.target = document.querySelector("#vig-ciph");
    if (this.target != null) {
      this.fromAlpha = this.target.querySelector("input.from");
      this.key = this.target.querySelector("input.key");
      this.offDirEn = this.target.querySelector("#vigCiphEncrypt");
      this.offDirDe = this.target.querySelector("#vigCiphDecrypt");
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.sub.bind(this), false);
    }
  }


  /*
  	sub
  
  	Performs the character substitution and displays the result on the page.
   */

  vigCiph.prototype.sub = function() {
    var char, charInd, finalInd, fromArr, i, keyArr, offsetInd, resultArr, _i, _len;
    fromArr = this.fromAlpha.value.split("");
    keyArr = this.key.value.split("");
    resultArr = this.textarea.value.split("");
    if (keyArr.every(function(val) {
      return fromArr.indexOf(val) > -1;
    })) {
      for (i = _i = 0, _len = resultArr.length; _i < _len; i = ++_i) {
        char = resultArr[i];
        if (fromArr.indexOf(char) > -1) {
          charInd = fromArr.indexOf(char);
          offsetInd = fromArr.indexOf(keyArr[i % keyArr.length]);
          finalInd = this.offDirEn.checked ? charInd + offsetInd : charInd - offsetInd;
          if (finalInd < 0) {
            finalInd = fromArr.length + (finalInd % fromArr.length);
          }
          resultArr[i] = fromArr[finalInd % fromArr.length];
        }
      }
      return this.resultarea.innerHTML += "<p>" + resultArr.join("") + "</p>";
    } else {
      alert("Not all the characters in your key are part of the character set.");
      return console.error("Not all the characters in your key are part of the character set.");
    }
  };

  return vigCiph;

})();
