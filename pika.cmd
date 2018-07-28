@echo off

set COMMAND=%1
for /f "tokens=1,* delims= " %%a in ("%*") do set PARAMS=%%b

if "%COMMAND%" == "run" (
  call bin/run %PARAMS%

) else if "%COMMAND%" == "format" (
  call npm run prettier

) else (
  echo.
  echo Usage: pika [command]
  echo.
  echo where [command] is one of:
  echo    run - execute application. Use --help argument to see command help.
  echo    format - auto format project code using prettier.

  exit /b 1
)

:end
