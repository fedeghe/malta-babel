---
[![npm version](https://badge.fury.io/js/malta-babel.svg)](http://badge.fury.io/js/malta-babel)
[![Dependencies](https://david-dm.org/fedeghe/malta-babel.svg)](https://david-dm.org/fedeghe/malta-babel)
[![npm downloads](https://img.shields.io/npm/dt/malta-babel.svg)](https://npmjs.org/package/malta-babel)
[![npm downloads](https://img.shields.io/npm/dm/malta-babel.svg)](https://npmjs.org/package/malta-babel)  
---  

This plugin can be used on: **.ts** files and even on **.coffee** and **.js** files after using the right plugin

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-babel
```
or in the .json file :
```
"app/source/index.js" : "public/js -plugins=malta-babel"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-babel',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```