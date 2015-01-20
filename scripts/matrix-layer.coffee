###
matrixLayer

Produces an HTML table or "matrix" to help visualise a ciphertext encrypted with a transposition
cipher.
###
class matrixLayer
	###
	constructor

	Checks for the matching DOM element wrapper and sets up instance variables and event listeners.
	###
	constructor: ->
		@target = document.querySelector("#matrix-layer")
		if @target?
			@order = @target.querySelector("input.order")
			@cols = @target.querySelector("input.length")
			@colDirEn = @target.querySelector("#matLayEncrypt")
			@colDirDe = @target.querySelector("#matLayDecrypt")
			@textarea = @target.querySelector("textarea")
			@button = @target.querySelector("button")
			@resultarea = @target.querySelector(".results")
			@button.addEventListener "click", @lay.bind(this), false

	###
	lay

	Lays the text into the matrix.
	###
	lay: ->
		text = @textarea.value.split("")
		pos = 0;
		columns = @cols.valueAsNumber
		rows = Math.ceil(text.length/columns)
		matrix = []
		if @colDirEn.checked
			for i in [0..rows-1]
				for n in [0..columns-1]
					if not matrix[i]?
						matrix[i] = []
					matrix[i][n] = text[pos]
					pos++
		else
			for i in [0..columns-1]
				for n in [0..rows-1]
					if not matrix[n]?
						matrix[n] = []
					matrix[n][i] = text[pos]
					pos++
		@display(matrix)


	###
	display

	Generates HTML for the given results and inserts it into the page.

	@param results An objects containing the frequency check results.
	###
	display: (results) ->
		html = "<table><tbody>"
		text = ""
		order = @order.value.split("")
		for column in results
			html += "<tr>"
			tmp = ""
			for cell in column
				html += "<td>" + cell + "</td>"
				tmp += cell
			if order.length is @cols.valueAsNumber
				for pos in order
					text += column[parseInt(pos)-1]
			else
				text += tmp
			html += "</tr>"
		html += "</tbody></table><p>" + text + "</p>"
		@resultarea.innerHTML += html