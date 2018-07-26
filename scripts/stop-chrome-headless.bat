@echo off
echo *
echo * Reading pid from ./processes/chrome.pid file
for /f "delims=" %%i in (.\processes\chrome.pid) do set pid=%%i
echo * Killing chrome headless process with PID %pid%
taskkill /PID %pid% /T /F
echo *  Removing chrome.pid file
del .\processes\chrome.pid
echo *
echo *********** Chrome in headless mode stopped ***********