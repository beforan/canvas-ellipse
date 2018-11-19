# Introduction 
This is an **ARCHIVED** repository, for an earlier implementation of the DECSYS Ellipse Scale. The current scale library is [here](https://github.com/decsys/rating-scales).

This version never saw the light of day beyond some demos, and there are no guarantees its build and testing processes work particularly well.

However, some of the code may remain of interest. It is essentially a reasonably designed, fairly pure Entity-Component-System engine, in Typescript.

Its Systems and Components are quite limited in scope (e.g. mostly only HTML Canvas2d line and text drawing), and it features no proper loop-based ticker, so would be poor for games or animation without an external loop to drive it.

## Use as the Ellipse Scale tool

The Ellipse tool is a javascript library that attaches to an HTML Canvas element, and provides an interactive information gathering experience based on provided options.

It is intended for use as a type of survey question, where instead of selecting a discrete value on a scale of 1 to 10, for example, the respondent can draw an ellipse around the scale to indicate the upper and lower bounds of their response.

# Getting started

## Installation

You can clone this repo and use the built files (in the `dist` directory).

## Latest releases

None. Clone the repo and fly by the seat of your pants.

# Build and Test

Development dependencies are exclusively managed by npm

1. Have npm 5+
2. Clone the repo
3. `> npm install`
4. Have gulp globally installed (`> npm i -g gulp`)

## Build

The source is written in TypeScript, and transpiled to ES5 with CommonJS module support.

This is then packaged as a standalone browser module in a single `.js` file by Browserify. Gulp manages everything.

There is a default gulp task to build, and also a watch task, so feel free to:

- `> gulp` to build once
- `> gulp watch` to rebuild on `src` file changes

## Test

Tests are written in TypeScript.

Tests are run against the TypeScript source (not the Browserify output) using `mocha`, with `chai` for assertions (in the `expect` style) and `sinon` for mocks, stubs and spies.

Gulp will run `mocha`:

`> gulp test`

# Contribute

Not right now.

# Licensing

This software has no license, and therefore all rights are reserved as per author copyright, with the exception of rights waived under the GitHub Terms of Service.

Please don't modify, distribute or use this software until a license is in place.

# Documentation Notes

Bar Label Alignment defaults to bottom if it recieves an invalid alignment parameter.

