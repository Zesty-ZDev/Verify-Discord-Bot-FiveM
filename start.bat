@echo off
CMD /C npm i
echo Starting..
:main
node .
echo Restarting Bot..
goto main
