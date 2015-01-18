class subCiph
	constructor: ->
		@target = document.querySelector("#sub-ciph")
		if @target?
			@fromAlpha = @target.querySelector("input.from")
			@toAlpha = @target.querySelector("input.to")
			@rotDirEn = @target.querySelector("#subCiphEncrypt")
			@rotDirDe = @target.querySelector("#subCiphDecrypt")
			@rotVal = @target.querySelector("input.rotVal")
			@rotBut = @target.querySelector("button.rotBut")
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button:not(.rotBut)")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @sub.bind(this), false
			@rotBut.addEventListener "click", @rotFrom.bind(this), false

	sub: ->
		result = @textarea.value.split("")
		subs = @getSubs()
		for i in [0..result.length-1]
			result[i] = if subs[result[i]]? then subs[result[i]] else result[i]
		@resultarea.innerHTML += "<p>" + result.join("") + "</p>"

	getSubs: ->
		subs = {}
		from = @fromAlpha.value.split("")
		to = @toAlpha.value.split("")
		if from.length isnt to.length
			paceMaker = if from.length < to.value.length then from.length else to.value.length
		else
			paceMaker = from.length
		for num in [0..paceMaker-1]
			subs[from[num]] = to[num]
		subs

	rotFrom: ->
		fromArr = @fromAlpha.value.split("")
		if @rotDirDe.checked
			fromArr.unshift(fromArr.pop()) for i in [0..@rotVal.valueAsNumber-1]
		else
			fromArr.push(fromArr.shift()) for i in [0..@rotVal.valueAsNumber-1]
		@toAlpha.value = fromArr.join("")