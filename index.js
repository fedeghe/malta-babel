require('malta').checkExec('babel');

var path = require('path'),
	fs = require('fs'),
	child_process = require('child_process');

function malta_es6(o, options) {

	var self = this,
		start = new Date(),
		msg,
		outname = o.name,
		pluginName = path.basename(path.dirname(__filename));
	
	options = options || {};

	return function (solve, reject){
		try {
			var ls = child_process.spawn('babel', [o.name, '--out-file', outname, '--presets', ['es2015']]);
			ls.on('exit', function (code) {
				o.content = fs.readFileSync(o.name) + "";
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name;
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			doErr(err);
		}
	};
}
malta_es6.ext = 'js';
module.exports = malta_es6;