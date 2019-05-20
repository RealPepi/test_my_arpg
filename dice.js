rollingDice = function(string) {
	var format = string.match(new RegExp([
			"\\d+" + "D" + "\\d+" + "\\+" + "\\d+",
			"\\d+" + "D" + "\\d+"
		].join("|")));

	if(!(format && format[0] == string)) {
		return {"check": false};
	}

	var sum = 0, detail = " = (";

	if(string.match(new RegExp(["\\d+" + "D" + "\\d+" + "\\+" + "\\d+"]))) {
		string = string.split(/[D|+]/);

		for(var i = 1; i <= string[0]; i++) {
			var tmp = Math.floor(Math.random() * string[1] + 1);
			sum += tmp;
			detail += (i == 1)? tmp: ", " + tmp;
		}
		sum += parseInt(string[2]);

		return {"check": true, "result": "" + sum + detail + ") + " + string[2]};
	}

	if(string.match(new RegExp(["\\d+" + "D" + "\\d+"]))) {
		string = string.split("D");

		for(var i = 1; i <= string[0]; i++) {
			var tmp = Math.floor(Math.random() * string[1] + 1);
			sum += tmp;
			detail += (i == 1)? tmp: ", " + tmp;
		}
		
		return {"check": true, "result": "" + sum + detail + ")"};
	}
}