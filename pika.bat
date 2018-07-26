@echo off

set COMMAND=%1
set PARAMS=%2 %3 %4

if "%COMMAND%" == "run" (
  call scripts/start-chrome-headless.bat
  call bin/run %PARAMS%
  call scripts/stop-chrome-headless.bat

) else if "%COMMAND%" == "format" (
  call npm run prettier

) else (
  echo.
  echo Usage: pika [command]
  echo.
  echo where [command] is one of:
  echo    run [initial-url] [chunks] - run the crawler test - also starts and stops chrome
  echo      - initial-url: Initial Url to open and parse links.
  echo      - chunks: Number of concurrent url calls. Default 2.
  echo    format - auto format project code using prettier

  exit /b 1
)

:end
