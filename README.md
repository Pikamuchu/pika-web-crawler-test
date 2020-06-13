# wcrawl 

[![Version](https://img.shields.io/npm/v/wcrawl.svg)](https://npmjs.org/package/wcrawl)
[![Build Status](https://img.shields.io/travis/pikamachu/pika-web-crawler-test/master.svg)](https://travis-ci.org/pikamachu/pika-web-crawler-test)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7a5d465f487e4f55a8e50e8201cc69b1)](https://www.codacy.com/project/antonio.marin.jimenez/pika-web-crawler-test/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pikamachu/pika-web-crawler-test&amp;utm_campaign=Badge_Grade_Dashboard)
[![codecov](https://codecov.io/gh/pikamachu/pika-web-crawler-test/branch/master/graph/badge.svg)](https://codecov.io/gh/pikamachu/pika-web-crawler-test)

<a href='https://ko-fi.com/Q5Q21TCUG' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Introduction

Web crawler script for web testing with snapshot comparison.

## Installing / Getting started

To install the package execute:
```
npm install -g wcrawl
```

After installation, tou will have access to the wcrawl binary in your command line.
You can check help with this command:
```
wcrawl --help
```

## Developing 
 
### Built With
* [Oclif](https://github.com/oclif/oclif)
* [Headless Chrome Automation tool](https://github.com/graphcool/chromeless)
* [Chrome Launcher](https://github.com/GoogleChrome/chrome-launcher)
* [Cheerio](https://github.com/cheeriojs/cheerio)

### Prerequisites
The following software must be installed
* [Node >= v8](https://nodejs.org/en/)
* [Chrome >= v60](https://www.google.com.mx/chrome/)
* [Git](https://git-scm.com/downloads) - optional

### Folder structure
* root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration files.
* bin: Contains the application run script.
* src: Contains the source code for application script.
* node_modules: Contains third party JS libraries used in this project

### Setting up Dev

Download the code
```
git clone https://github.com/pikamachu/pika-web-crawler-test.git
cd pika-web-crawler-test
```

Install dependencies
```
bash pika install
```

Run application help for usage.
```
bash pika start --help
```

Run application tests.
```
bash pika test
```

### Other project commands

For other project command execute pika script help

```shell
bash pika help
```
