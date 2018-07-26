#!/bin/bash
echo "*********** Starting chrome in headless mode ***********"
echo "*"

nohup google-chrome-stable --remote-debugging-port=9222 --headless  > /dev/null 2>&1 &

echo "* Storing pid %pid% to ./processes/chrome.pid"
echo "*"

pid=`ps -ef | grep chrome | grep remote-debugging-port | grep "$(whoami)" | awk '{ print $2 }'`
echo $pid > "./processes/chrome.pid"