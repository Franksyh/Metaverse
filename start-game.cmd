@echo off
cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js / npm was not found.
  echo Please install Node.js, then run this file again.
  pause
  exit /b 1
)

start "metaverse-adventure-dev-server" /min cmd /c "npm.cmd run dev -- --port 5173"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:5173/"
