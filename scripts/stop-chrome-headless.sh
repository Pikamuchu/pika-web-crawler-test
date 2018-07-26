#!/bin/bash
echo "*"
echo "* Reading pid from ./processes/chrome.pid file"

pid=`cat ./processes/chrome.pid`

echo "* Killing chrome headless process with PID $pid"

kill -9 $pid

echo "*  Removing chrome.pid file"

rm ./processes/chrome.pid

echo "*"
echo "*********** Chrome in headless mode stopped ***********"