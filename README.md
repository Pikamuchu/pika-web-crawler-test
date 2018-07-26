# Pika web crawler test 

## Introduction

Web crawler test script for web testing with snapshop comparison.

## Installing / Getting started 

TODO

## Developing 
 
### Built With
* [Oclif](https://github.com/oclif/oclif)
* [Headless Chrome Automation tool](https://github.com/graphcool/chromeless)
* [Cheerio](https://github.com/cheeriojs/cheerio)

### Prerequisites
The following software must be installed
* [Node >= v8](https://nodejs.org/en/)
* [Chrome >= v60](https://www.google.com.mx/chrome/)
* [Git](https://git-scm.com/downloads) - optional

### Folder structure
* root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration file.
* bin: Contains the oclif script run.
* scripts: Contains the scripts to start/stop Chrome in headless mode or any other system script required to run the tests.
* src: Contains the source code for crawler test script.
* node_modules: Contains third party JS libraries used in this project

### Setting up Dev

Download the code
```
git clone https://github.com/pikamachu/pika-web-crawler-test.git
cd pika-web-crawler-test
```

Install dependencies
```
npm install
```

Run web crawler test.
Parameters:
- initial-url: Initial Url to open and parse links.
- chunks: Number of concurrent url calls.
```
bin/run [initial-url] [chunks]
```

### Pika commands

All previous command can be executed using pika script

```shell
Usage: pika [command]

where [command] is one of:
   run [initial-url] [chunks] - run the crawler test - also starts and stops chrome
     - initial-url: Initial Url to open and parse links.
     - chunks: Number of concurrent url calls. Default 2
   format - auto format project code using prettier
```

## Windows Environment
* If the project is ran in a Windows environment use the script files to start and stop chrome.
* Chrome should be installed in **c:\Program Files (x86)\Google\Chrome\Application**, if it is not the case update the path in **processes/start-chrome-headless.bat**.

