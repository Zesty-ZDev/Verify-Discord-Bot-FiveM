@echo off
@echo OFF
node -v 2> Nul
if "%errorlevel%" == "9009" (
    echo You must install NodeJS to use this bot!
    echo You can install NodeJS from https://nodejs.org/ and selecting the LTS version 
    pause
) else (
CMD /C npm i
echo Starting..
:main
node .
echo Restarting Bot...
pause
goto main
)