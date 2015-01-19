###
strSlice

Emphasises letters at regular intervals in a string and produces HTML
output to reflect the results.
###
class strSlice
	###
	constructor

	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
	###
	constructor: ->
		@target = document.querySelector("#str-slice")
		if @target?
			@interval = @target.querySelector("input.interval")
			@offset = @target.querySelector("input.offset")
			@len = @target.querySelector("input.length")
			@disHi = @target.querySelector("#strSliceHighlight")
			@disRe = @target.querySelector("#strSliceRemove")
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @strip.bind(this), false

	###
	strip

	Performs the character stripping and calls the display method with the results.
	###
	strip: ->
		text = @textarea.value.split("")
		results = text
		interval = @interval.valueAsNumber
		offset = @offset.valueAsNumber
		for i in [offset..text.length-1] by interval
			results[i] = {val: results[i], highlight: true}
		@display results

	###
	display

	Generates HTML for the given results and inserts it into the page.

	@param results An objects containing the frequency check results.
	###
	display: (results) ->
		html = "<p>"
		for char in results
			if typeof char is "object"
				workLen = @len.valueAsNumber-1
				html += "<span class=\"highlight\">" + char.val + "</span>"
			else if workLen > 0
				workLen--
				html += "<span class=\"highlight\">" + char + "</span>"
			else if @disHi.checked
				html += char
		html += "</p>"
		@resultarea.innerHTML += html