@echo off

set COMMAND=%1
for /f "tokens=1,* delims= " %%a in ("%*") do set PARAMS=%%b

if "%COMMAND%" == "run" (
  call bin/run %PARAMS%

) else if "%COMMAND%" == "test" (
  call npm run test

) else if "%COMMAND%" == "format" (
  call npm run prettier

) else if "%COMMAND%" == "format" (
  (call npm whoami || call npm login) && call npm publish

) else (
  echo.
  echo Usage: pika [command]
  echo.
  echo where [command] is one of:
  echo    run - execute application. Use --help argument to see command help.
  echo    test - execute application tests.
  echo    format - auto format project code using prettier.
  echo    publish - do login and publish package.

  exit /b 1
)

:end
