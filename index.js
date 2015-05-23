var fs = require('fs');
var cssscss = require('css-scss');
var pkg = require(process.cwd() + '/package.json');

var src = fs.readFileSync(pkg.process.css2scss.src, 'utf8');
var scss = cssscss(src);

fs.writeFileSync(pkg.process.css2scss.build, scss);
