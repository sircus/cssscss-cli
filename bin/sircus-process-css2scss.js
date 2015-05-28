#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var program = require("commander");
var color = require("chalk");
var cssscss = require("css-scss");
var pkg = require("../package.json");

program
  .version(pkg.version)
  .usage("[<input> [<output>]]")
  .parse(process.argv);

var input = program.args[0] ? path.resolve(program.args[0]) : null;
var output = program.args[1] ? path.resolve(program.args[1]) : null;


if(input || output){
  return transform();
} else {
  console.error(
    color.red("%s ERROR: <input-css-file> & <output-scss-file>"), pkg.name
  );
  return program.help();
};


function source(){
  try {
    var css = fs.readFileSync(input, "utf8");
    return css;
  } catch (err) {
    console.error(
      color.red("%s ERROR: No such file <input-css-file>"), pkg.name
    );
    throw err
  }
}


function transform(){
  var scss = cssscss(source());
  return fs.writeFile(output, scss, function(err) {
    if (err) {
      throw err
    }
    console.log(
      color.green("%s SUCCESS: " + program.args[1]), pkg.name
    );
  });
}
