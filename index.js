
const babel = require('@babel/core'),
path = require('path'),
fs = require('fs');

function malta_babel(obj, options) {
const self = this,
    start = new Date(),
    oldName = obj.name, 
    rx = /\.(ts|jsx)$/,
    configPath = self.execDir + '/',
    pluginName = path.basename(path.dirname(__filename));

let msg;
obj.name = obj.name.replace(rx, '.js'),

options = options || {};

return (solve, reject) => {
    const doDelete = !!(oldName.match(rx));
    if (options.config) {
        try {
            fs.readFile(configPath + options.config, 'utf8', (err, data) => {
                if (err) throw err;
                const config = JSON.parse(data)
                obj.content = babel.transform(obj.content, config).code;
                fs.writeFile(obj.name, obj.content, err => {
                    if (err) {
                        self.doErr(err, obj, pluginName);
                    }
                    msg = 'plugin ' + pluginName.white() + ' wrote ' + obj.name + ' (' + self.getSize(obj.name) + ')';
                    err
                        ? reject(`Plugin ${pluingName} write error:\n${err}`)
                        : solve(obj);
                    self.notifyAndUnlock(start, msg);
                    doDelete && fs.unlink(oldName, () => { });
                });
            })
        } catch (err) {
            // the config file is not readable or cant be found or is no json
            self.doErr(err, obj, pluginName);
            doDelete && fs.unlink(oldName, () => { });
            msg = `Plugin ${pluingName} error:\n${err}`
            reject(msg);
            self.notifyAndUnlock(start, msg);
        }
    } else {
        obj.content = babel.transform(obj.content).code;
        console.log(obj.content)
        try {
            fs.writeFile(obj.name, obj.content, err => {
                if (err) {
                    self.doErr(err, o, pluginName);
                }
                msg = 'plugin ' + pluginName.white() + ' wrote ' + obj.name + ' (' + self.getSize(obj.name) + ')';
                err
                    ? reject(`Plugin ${pluingName} write error:\n${err}`)
                    : solve(obj);
                self.notifyAndUnlock(start, msg);
                doDelete && fs.unlink(oldName, () => { });
            });
        } catch (err) {
            // whatever 
            self.doErr(err, obj, pluginName);
            doDelete && fs.unlink(oldName, () => { });
            msg = `Plugin ${pluingName} error:\n${err}`
            reject(msg);
            self.notifyAndUnlock(start, msg);
        }
    }
};

}
malta_babel.ext = ['js', 'ts', 'jsx'];
module.exports = malta_babel;