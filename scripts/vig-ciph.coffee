###
vigCiph

Performs a character substitution based on a given key.
###
class vigCiph
	###
	constructor

	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
	###
	constructor: ->
		@target = document.querySelector("#vig-ciph")
		if @target?
			@fromAlpha = @target.querySelector("input.from")
			@key = @target.querySelector("input.key")
			@offDirEn = @target.querySelector("#vigCiphEncrypt")
			@offDirDe = @target.querySelector("#vigCiphDecrypt")
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @sub.bind(this), false

	###
	sub

	Performs the character substitution and displays the result on the page.
	###
	sub: ->
		fromArr = @fromAlpha.value.split("")
		keyArr = @key.value.split("")
		resultArr = @textarea.value.split("")
		if keyArr.every((val) -> fromArr.indexOf(val) > -1)
			for char, i in resultArr
				if fromArr.indexOf(char) > -1
					charInd = fromArr.indexOf(char)
					offsetInd = fromArr.indexOf(keyArr[i % keyArr.length])
					finalInd = if @offDirEn.checked then (charInd + offsetInd) else (charInd - offsetInd)
					if finalInd < 0
						finalInd = fromArr.length + (finalInd % fromArr.length)
					resultArr[i] = fromArr[finalInd % fromArr.length]
			@resultarea.innerHTML += "<p>" + resultArr.join("") + "</p>"
		else
			alert "Not all the characters in your key are part of the character set."
			console.error "Not all the characters in your key are part of the character set."
