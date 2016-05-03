var assert = require('chai').assert
var path = require('path')
var rimraf = require('rimraf')
var exec = require('child_process').exec
var glob = require('glob')
var dest = './test/temp'
var css = glob('./test/fixtures/*.css')

describe('--dest == string', function () {

  after(function (cb) {
    rimraf(dest, cb)
  })

  it('Check result files', function (done) {
    exec('node bin/cli.js ./test/fixtures/*.css -d ./test/temp', function() {
      var scss = glob('./test/temp/*.scss')
      assert.equal(css.length, scss.length)
      done()
    })
  })
})

describe('--dest == undefined', function () {
  after(function (cb) {
    rimraf('./test/fixtures/*.scss', cb)
  })

  it('Check result files', function (done) {
    exec('node bin/cli.js ./test/fixtures/*.css', function() {
      var scss = glob('./test/fixtures/*.scss')
      assert.equal(css.length, scss.length)
      done()
    })
  })

})
