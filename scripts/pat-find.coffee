###
patFind

Performs various computations in an attempt to find patterns in values in predefined DOM elements.
The results are then produced as HTML and outputted to the page.
###
class patFind
	###
	constructor

	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
	###
	constructor: ->
		@factorLimit = 10
		@patternLimit = 5
		@target = document.querySelector("#pat-find")
		if @target?
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @analyse.bind(this), false

	###
	analyse

	Performs analysis on each character based on its index in the text.
	###
	analyse: ->
		results = {}
		text = @textarea.value
		textArr = text.split("")
		for char, i in textArr
			if results[char]?
				results[char].count++
				results[char].occurrences.push(i)
			else
				results[char] = {count: 1, occurrences: [i], factors: {}}
			results[char].factors[i] = @getFactors(@factorLimit, i)
		results = {position: results, patterns: @findStrPats(@patternLimit, text)}
		@display results

	###
	getFactors

	Finds the factors of a given number.

	@param limit The highest number to attempt to discover factors for.
	@param num The number to find factors for.
	###
	getFactors: (limit, num) ->
		result = []
		for i in [2..limit]
			factor = num / i
			if parseInt(factor) is factor
				result.push(i)
		result

	###
	findStrPats

	Searches the text for reoccuring patterns.

	@param limit The highest length pattern to attempt to discover.
	@param text The text to search.
	###
	findStrPats: (limit, text) ->
		results = {}
		for i in [0..text.length-1]
			workingText = text.substr i
			for n in [2..limit]
				subtext = workingText.substr(n)
				pos = n
				while subtext.indexOf(workingText.substr(0, n)) > -1
					pattern = workingText.substr(0, n)
					results[pattern] = if results[pattern]? then results[pattern]+1 else 1
					subtext = subtext.substr(subtext.indexOf(workingText.substr(0, n))+n)
					pos += subtext.indexOf(workingText.substr(0, n)) + n
		results

	###
	display

	Generates HTML for the given results and inserts it into the page.
	Also produces some further statistical analysis by converting the values into
	percentages.

	@param results An objects containing the frequency check results.
	###
	display: (results) ->
		html = "<table><thead><tr><td rowspan=\"2\">Letter</td><td colspan=\"2\">Analysis</td></tr><tr><td>Total</td><td>Occurrences (Factors)</td></thead>"
		total = 0
		for own char, analysis of results.position
			html += "<td>" + char + "</td>"
			html += "<td>" + analysis.count + "</td>" + "<td><details><table><tbody>"
			factorTotals = {}
			factorTotal = 0
			for occurrence in analysis.occurrences
				factors = analysis.factors[occurrence]
				for factor in factors
					factorTotal++
					if factorTotals[factor]?
						factorTotals[factor]++
					else
						factorTotals[factor] = 1
				html += "<tr><td>" + occurrence + " (" + factors.join(", ") + ")</td></tr>"
			html += "</tbody></table><summary>("
			for own fac, tot of factorTotals
				if tot?
					html += fac + ": " + tot + "[" + Math.round((tot / factorTotal) * 100) + "%], "
			html = html.substr(0, html.length-2)+ ")</summary></details></td></tr>"
		html += "</tr></tbody></table><table><thead><tr><td>Pattern</td><td>Occurrences</td></tr></thead><tbody>"
		for own pattern, occurrence of results.patterns
			if occurrence > 1
				html += "<tr><td>" + pattern + "</td><td>" + occurrence + "</td></tr>"
		html += "</tbody></table>"
		@resultarea.innerHTML += html