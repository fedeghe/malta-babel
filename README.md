---
[![npm version](https://badge.fury.io/js/malta-babel.svg)](http://badge.fury.io/js/malta-babel)
[![npm downloads](https://img.shields.io/npm/dt/malta-babel.svg)](https://npmjs.org/package/malta-babel)
[![npm downloads](https://img.shields.io/npm/dm/malta-babel.svg)](https://npmjs.org/package/malta-babel)  
---  

This plugin can be used on: **.ts** and **.js** files

Options :  
    - config : the path relative to the execution folder of a config file
    

All [official presets](https://babeljs.io/docs/en/presets#official-presets) are already shipped in `malta-babel`, if in the config file you set up the usage of one or more plugins you need to add the dependency manually to Your project.

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-babel[config:\"myconf.json\"]
```
or in the .json file :
```
"app/source/index.js" : "public/js -plugins=malta-babel[config:\"myconf.json\"]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-babel[config:\"myconf.json\"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```

where my config could be: 
``` json  
{
    "presets": [
        [
            "@babel/env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "useBuiltIns": "usage"
            }
        ]
    ]
}
```