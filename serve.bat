@echo off
rem Double-click to start local preview server, then open http://localhost:8765
cd /d "%~dp0"
node serve.js
echo.
echo If the server did not start, please check that Node.js is installed.
pause
