module.exports = {
	getDateTime: function (dt) {
		var res = '';
		res += module.exports.formatDigits(dt.getFullYear());
		res += '-';
		res += module.exports.formatDigits(dt.getMonth() + 1);
		res += '-';
		res += module.exports.formatDigits(dt.getDate());
		res += ' ';
		res += module.exports.formatDigits(dt.getHours());
		res += ':';
		res += module.exports.formatDigits(dt.getMinutes());
		res += ':';
		res += module.exports.formatDigits(dt.getSeconds());
		return res;
	},

	getDate: function (dt) {
		var res = '';
		res += module.exports.formatDigits(dt.getFullYear());
		res += '-';
		res += module.exports.formatDigits(dt.getMonth() + 1);
		res += '-';
		res += module.exports.formatDigits(dt.getDate());

		return res;
	},

	formatDigits: function (val) {
		val = val.toString();
		return val.length == 1 ? '0' + val : val;
	},
};
