class freqCheck
	constructor: ->
		@target = document.querySelector("#freq-check")
		if @target?
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @check.bind(this), false

	check: ->
		results = {}
		text = @textarea.value
		for char in text.split("")
			if results[char]?
				results[char]++
			else
				results[char] = 1
		@display results

	display: (results) ->
		charStr = "<thead><tr>"
		freqStr = "<tbody><tr>"
		percStr = "<tr>"
		total = 0
		for own char, freq of results
			charStr += "<td>" + char + "</td>"
			freqStr += "<td>" + freq + "</td>"
			total += freq
		for own char, freq of results
			percStr += "<td>" + Math.round(freq / total * 100) + "%</td>"
		charStr += "</tr></thead>"
		freqStr += "</tr>"
		percStr += "</tr></tbody>"
		html = "<table>" + charStr + freqStr + percStr + "</table>"
		@resultarea.innerHTML += html