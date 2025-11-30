@echo off
echo ========================================
echo Starting Resume Portfolio App
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8080
echo.
echo Wait for both terminals to show "ready"
echo Then open: http://localhost:8080
echo ========================================
echo.
pause
