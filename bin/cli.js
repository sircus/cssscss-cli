#!/usr/bin/env node

var color = require('chalk')
var cssscss = require('css-scss')
var fs = require('fs')
var mkdirp = require('mkdirp')
var minimist = require('minimist')
var path = require('path')
var pkg = require('../package.json')

var NAME = pkg.name

var argv = minimist(process.argv.slice(2), {
  alias: {
    d: 'dest',
    h: 'help',
    v: 'version',
  },
})
var src = argv._ ? argv._ : []
var dest = argv.dest ? argv.dest : path.dirname(src[0])

if (argv.dest !== undefined) {
  mkdirp(dest)
}

if (argv.version) {
  console.log(pkg.version)
}

if (argv.help) {
  helpMsg()
}

if (src.length > 0) {
  return transform()
} else {
  console.error(color.red('✘ Error: <input-files> -d <dest>'), NAME)
  return helpMsg()
}

function source(file) {
  try {
    var css = fs.readFileSync(file, 'utf8')
    return css
  } catch (err) {
    console.error(color.red('✘ Error: No such file <input-files>'), NAME)
    throw err
  }
}

function transform() {
  src.forEach(function (file, i) {
    var scss = cssscss(source(file))
    var result = scss
      .replace(/\r?\n\/\/.Converted Variables\r?\n\r?\n/g, '')
      .replace(/\r?\n\r?\n\/\/.Custom Media Query Variables\r?\n/g, '')
    var filename = path.basename(file, '.css')
    var output = path.resolve(dest + '/_' + filename + '.scss')
    return fs.writeFileSync(output, result)
  })
  console.log(color.green('✔ Success:', NAME))
}

function helpMsg () {
  console.log('Usage: cssscss input-files -d output-dir')
  console.log('')
  console.log('  -d, --dest')
  console.log('  -v, --version')
  console.log('  -h, --help')
}
