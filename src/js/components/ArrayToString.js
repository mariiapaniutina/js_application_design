define(function () {
	return function (input) {
		var result = '';
		if (input && input.prototype.constructor == 'Array'){
			for (var i=0; i<input.length; i++){
				result += input[i] + ' ';
			}
		}
        return result;
    };
});