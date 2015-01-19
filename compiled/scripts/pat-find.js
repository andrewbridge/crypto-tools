
/*
patFind

Performs various computations in an attempt to find patterns in values in predefined DOM elements.
The results are then produced as HTML and outputted to the page.
 */
var patFind,
  __hasProp = {}.hasOwnProperty;

patFind = (function() {

  /*
  	constructor
  
  	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
   */
  function patFind() {
    this.factorLimit = 10;
    this.patternLimit = 5;
    this.target = document.querySelector("#pat-find");
    if (this.target != null) {
      this.textarea = this.target.querySelector("textarea");
      this.button = this.target.querySelector("button");
      this.resultarea = this.target.querySelector(".results");
      this.button.addEventListener("click", this.analyse.bind(this), false);
    }
  }


  /*
  	analyse
  
  	Performs analysis on each character based on its index in the text.
   */

  patFind.prototype.analyse = function() {
    var char, i, results, text, textArr, _i, _len;
    results = {};
    text = this.textarea.value;
    textArr = text.split("");
    for (i = _i = 0, _len = textArr.length; _i < _len; i = ++_i) {
      char = textArr[i];
      if (results[char] != null) {
        results[char].count++;
        results[char].occurrences.push(i);
      } else {
        results[char] = {
          count: 1,
          occurrences: [i],
          factors: {}
        };
      }
      results[char].factors[i] = this.getFactors(this.factorLimit, i);
    }
    results = {
      position: results,
      patterns: this.findStrPats(this.patternLimit, text)
    };
    return this.display(results);
  };


  /*
  	getFactors
  
  	Finds the factors of a given number.
  
  	@param limit The highest number to attempt to discover factors for.
  	@param num The number to find factors for.
   */

  patFind.prototype.getFactors = function(limit, num) {
    var factor, i, result, _i;
    result = [];
    for (i = _i = 2; 2 <= limit ? _i <= limit : _i >= limit; i = 2 <= limit ? ++_i : --_i) {
      factor = num / i;
      if (parseInt(factor) === factor) {
        result.push(i);
      }
    }
    return result;
  };


  /*
  	findStrPats
  
  	Searches the text for reoccuring patterns.
  
  	@param limit The highest length pattern to attempt to discover.
  	@param text The text to search.
   */

  patFind.prototype.findStrPats = function(limit, text) {
    var i, n, pattern, pos, results, subtext, workingText, _i, _j, _ref;
    results = {};
    for (i = _i = 0, _ref = text.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      workingText = text.substr(i);
      for (n = _j = 2; 2 <= limit ? _j <= limit : _j >= limit; n = 2 <= limit ? ++_j : --_j) {
        subtext = workingText.substr(n);
        pos = n;
        while (subtext.indexOf(workingText.substr(0, n)) > -1) {
          pattern = workingText.substr(0, n);
          results[pattern] = results[pattern] != null ? results[pattern] + 1 : 1;
          subtext = subtext.substr(subtext.indexOf(workingText.substr(0, n)) + n);
          pos += subtext.indexOf(workingText.substr(0, n)) + n;
        }
      }
    }
    return results;
  };


  /*
  	display
  
  	Generates HTML for the given results and inserts it into the page.
  	Also produces some further statistical analysis by converting the values into
  	percentages.
  
  	@param results An objects containing the frequency check results.
   */

  patFind.prototype.display = function(results) {
    var analysis, char, fac, factor, factorTotal, factorTotals, factors, html, occurrence, pattern, tot, total, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    html = "<table><thead><tr><td rowspan=\"2\">Letter</td><td colspan=\"2\">Analysis</td></tr><tr><td>Total</td><td>Occurrences (Factors)</td></thead>";
    total = 0;
    _ref = results.position;
    for (char in _ref) {
      if (!__hasProp.call(_ref, char)) continue;
      analysis = _ref[char];
      html += "<td>" + char + "</td>";
      html += "<td>" + analysis.count + "</td>" + "<td><details><table><tbody>";
      factorTotals = {};
      factorTotal = 0;
      _ref1 = analysis.occurrences;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        occurrence = _ref1[_i];
        factors = analysis.factors[occurrence];
        for (_j = 0, _len1 = factors.length; _j < _len1; _j++) {
          factor = factors[_j];
          factorTotal++;
          if (factorTotals[factor] != null) {
            factorTotals[factor]++;
          } else {
            factorTotals[factor] = 1;
          }
        }
        html += "<tr><td>" + occurrence + " (" + factors.join(", ") + ")</td></tr>";
      }
      html += "</tbody></table><summary>(";
      for (fac in factorTotals) {
        if (!__hasProp.call(factorTotals, fac)) continue;
        tot = factorTotals[fac];
        if (tot != null) {
          html += fac + ": " + tot + "[" + Math.round((tot / factorTotal) * 100) + "%], ";
        }
      }
      html = html.substr(0, html.length - 2) + ")</summary></details></td></tr>";
    }
    html += "</tr></tbody></table><table><thead><tr><td>Pattern</td><td>Occurrences</td></tr></thead><tbody>";
    _ref2 = results.patterns;
    for (pattern in _ref2) {
      if (!__hasProp.call(_ref2, pattern)) continue;
      occurrence = _ref2[pattern];
      if (occurrence > 1) {
        html += "<tr><td>" + pattern + "</td><td>" + occurrence + "</td></tr>";
      }
    }
    html += "</tbody></table>";
    return this.resultarea.innerHTML += html;
  };

  return patFind;

})();
