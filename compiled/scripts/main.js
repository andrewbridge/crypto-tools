var namespace;

namespace = "cryptoTools";

if (window.init != null) {
  namespace += new Date().getTime();
}

window[namespace] = {};


/*
init

Initialises all the tools on the page, and sends calls to set up persistent
memory storage.
 */

window[namespace].init = function() {
  window[namespace].autoSaveRestore();
  window[namespace].autoSave();
  window[namespace].freqCheck = new freqCheck();
  window[namespace].subCiph = new subCiph();
  window[namespace].vigCiph = new vigCiph();
  window[namespace].patFind = new patFind();
  window[namespace].strSlice = new strSlice();
  return window[namespace].matrixLayer = new matrixLayer();
};

document.addEventListener("DOMContentLoaded", window[namespace].init, false);


/*
autoSave

Sets up observers on each of the tool results in order to save the contents
whenever it changes. Changes are saved to the localStorage object.

@attribution Some of this method is based off examples from mdn.io/MutationObserver
 */

window[namespace].autoSave = function() {
  var button, config, observer, target, _i, _len, _ref, _results;
  if (localStorage.results == null) {
    localStorage.results = "{}";
  }
  observer = new MutationObserver(function(mutations) {
    return mutations.forEach(function(mutation) {
      var parentName, results;
      results = JSON.parse(localStorage.results);
      parentName = mutation.target.parentNode.id;
      results[parentName] = mutation.target.innerHTML;
      return localStorage.results = JSON.stringify(results);
    });
  });
  config = {
    attributes: true,
    childList: true,
    characterData: true
  };
  _ref = document.querySelectorAll('.results');
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    target = _ref[_i];
    button = document.createElement("button");
    button.className = "clear-res-but";
    button.innerHTML = "Clear Results";
    button.addEventListener("click", window[namespace].clearResults.bind(window, target.parentNode.id), false);
    target.parentNode.insertBefore(button, target);
    _results.push(observer.observe(target, config));
  }
  return _results;
};


/*
clearResults

Clears the results of the given results block from the page and from persistent memory.
If an error occurs, the method has no option but to reinitialise the object.
 */

window[namespace].clearResults = function(id) {
  var e, results;
  if (localStorage.results != null) {
    try {
      results = JSON.parse(localStorage.results);
      if (results[id] != null) {
        delete results[id];
        localStorage.results = JSON.stringify(results);
      }
    } catch (_error) {
      e = _error;
      console.error("Corrupt results, they're lost. Sorry.", localStorage.results);
      localStorage.results = "{}";
    }
  }
  return document.querySelector("#" + id + " .results").innerHTML = "";
};


/*
autoSaveRestore

Runs through the results in the localStorage object if it exists and re-inserts the results
onto the page. If an error occurs, the method has no option but to reinitialise the object.
 */

window[namespace].autoSaveRestore = function() {
  var e, html, parent, results, _results;
  if (localStorage.results != null) {
    try {
      results = JSON.parse(localStorage.results);
      _results = [];
      for (parent in results) {
        html = results[parent];
        _results.push(document.querySelector("#" + parent + " .results").innerHTML = html);
      }
      return _results;
    } catch (_error) {
      e = _error;
      console.error("Corrupt results, they're lost. Sorry.", localStorage.results);
      return localStorage.results = "{}";
    }
  }
};
