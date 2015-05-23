# sircus-process-css2scss

[![npm version](https://img.shields.io/npm/v/sircus-process-css2scss.svg?style=flat)](https://www.npmjs.com/package/sircus-process-css2scss)
[![Build Status](https://img.shields.io/travis/sircus/process-css2scss/master.svg?style=flat)](https://travis-ci.org/sircus/process-css2scss)

> convert to scss from css4 syntax using css-scss

## Dependencies

* [css-scss](https://github.com/jxnblk/css-scss)


## Usage

### package.json

```json
"devDependencies": {
  "sircus-process-css2scss": "*"
},
"process": {
  "css2css": {
    "src": "./input.css",
    "build": "./output.css",
  }
},
"scripts": {
  "build" : "node node_modeules/sircus-process-css2scss"
}
```
