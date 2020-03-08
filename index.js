require('malta').checkExec('babel');

const path = require('path'),
	fs = require('fs'),
	child_process = require('child_process');

function malta_es6(o, options) {
	const self = this,
		start = new Date(),
		outname = o.name.replace(/\.(ts|coffee)$/, '.js'),
		pluginName = path.basename(path.dirname(__filename)),
        args = [o.name, '-o', outname];
        
	let msg;

	options = options || {};
	if ('plugins' in options) args.push('--plugins', options.plugins);
	if ('presets' in options) args.push('--presets', options.presets);

	return (solve, reject) => {
		const doDelete = !!(o.name.match(/\.(ts|coffee)$/));
		try {
			const ls = child_process.spawn('babel', args);
			ls.on('exit', code => {
				if (code == 0) {
					o.content = fs.readFileSync(outname) + "";
					msg = 'plugin ' + pluginName.white() + ' wrote ' + outname;
					doDelete && fs.unlink(o.name, () => {});
					solve(o);
					self.notifyAndUnlock(start, msg);
				}
			});
			ls.stderr.on('data', err => {
				console.log("ERROR".red());
				msg = 'plugin ' + pluginName.white() + ' compilation error';
				console.log((err+"").white());
				doDelete && fs.unlink(o.name, () => {});
				reject(msg);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_es6.ext = ['js', 'coffee', 'ts'];
module.exports = malta_es6;