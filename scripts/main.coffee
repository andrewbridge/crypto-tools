namespace = "cryptoTools"
if window.init?
	namespace += new Date().getTime()
window[namespace] = {}
window[namespace].init = ->
	window[namespace].autoSaveRestore()
	window[namespace].autoSave()
	window[namespace].freqCheck = new freqCheck()
	window[namespace].subCiph = new subCiph()

window[namespace].autoSave = ->
	if not localStorage.results?
		localStorage.results = "{}"

	# create an observer instance
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
	for target in document.querySelectorAll('.results')
		button = document.createElement("button")
		button.innerHTML = "Clear Results"
		button.addEventListener "click", window[namespace].clearResults.bind(window, target.parentNode.id), false
		target.parentNode.insertBefore button, target
		observer.observe target, config

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

window[namespace].autoSaveRestore = ->
	if localStorage.results?
		try
			results = JSON.parse(localStorage.results)
			for parent, html of results
				document.querySelector("#" + parent + " .results").innerHTML = html
		catch e
			console.error "Corrupt results, they're lost. Sorry.", localStorage.results
			localStorage.results = "{}"

document.addEventListener "DOMContentLoaded", window[namespace].init, false