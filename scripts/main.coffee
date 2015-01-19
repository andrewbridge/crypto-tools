# Sets up a namespace in order to not muddy the global scope.
namespace = "cryptoTools"
if window.init?
	namespace += new Date().getTime()
window[namespace] = {}

###
init

Initialises all the tools on the page, and sends calls to set up persistent
memory storage.
###
window[namespace].init = ->
	window[namespace].autoSaveRestore()
	window[namespace].autoSave()
	window[namespace].freqCheck = new freqCheck()
	window[namespace].subCiph = new subCiph()
	window[namespace].vigCiph = new vigCiph()
	window[namespace].patFind = new patFind()

# An event listener to ensure the above method is only run once the DOM is ready.
document.addEventListener "DOMContentLoaded", window[namespace].init, false

###
autoSave

Sets up observers on each of the tool results in order to save the contents
whenever it changes. Changes are saved to the localStorage object.

@attribution Some of this method is based off examples from mdn.io/MutationObserver
###
window[namespace].autoSave = ->
	# Initialise the results if needed.
	if not localStorage.results?
		localStorage.results = "{}"

	# Create an observer instance, anonymous functions are created to store changes to localStorage
	observer = new MutationObserver((mutations) ->
		mutations.forEach((mutation) ->
			results = JSON.parse(localStorage.results)
			parentName = mutation.target.parentNode.id
			results[parentName] = mutation.target.innerHTML
			localStorage.results = JSON.stringify(results)
		)
	)

	# configuration of the observer:
	config = { attributes: true, childList: true, characterData: true }
	 
	# pass in the target node, as well as the observer options
	# make it reusable by looking for any element with a "results" class
	for target in document.querySelectorAll('.results')
		button = document.createElement("button")
		button.className = "clear-res-but"
		button.innerHTML = "Clear Results"
		button.addEventListener "click", window[namespace].clearResults.bind(window, target.parentNode.id), false
		target.parentNode.insertBefore button, target
		observer.observe target, config

###
clearResults

Clears the results of the given results block from the page and from persistent memory.
If an error occurs, the method has no option but to reinitialise the object.
###
window[namespace].clearResults = (id) ->
	if localStorage.results?
		try
			results = JSON.parse(localStorage.results)
			if results[id]?
				delete results[id]
				localStorage.results = JSON.stringify(results)
		catch e
			console.error "Corrupt results, they're lost. Sorry.", localStorage.results
			localStorage.results = "{}"
	document.querySelector("#" + id + " .results").innerHTML = ""

###
autoSaveRestore

Runs through the results in the localStorage object if it exists and re-inserts the results
onto the page. If an error occurs, the method has no option but to reinitialise the object.
###
window[namespace].autoSaveRestore = ->
	if localStorage.results?
		try
			results = JSON.parse(localStorage.results)
			for parent, html of results
				document.querySelector("#" + parent + " .results").innerHTML = html
		catch e
			console.error "Corrupt results, they're lost. Sorry.", localStorage.results
			localStorage.results = "{}"