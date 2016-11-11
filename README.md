This plugin can be used on: **.js** files  

Sample usage:  

    malta app/source/index.js public/js -plugins=malta-babel

or in the .json file :

    "app/source/index.js" : "public/js -plugins=malta-babel"

or in a script : 

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
            */
        });
