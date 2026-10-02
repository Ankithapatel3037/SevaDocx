@echo off
set "PATH=C:\Users\HP\.nodejs\node-v20.18.0-win-x64;%PATH%"
echo Starting SevaDocs Development Server...
echo Open http://localhost:5173/ in your browser.
npm.cmd run dev -- --host 127.0.0.1 --port 5173
pause
