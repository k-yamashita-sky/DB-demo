@echo off
echo ==============================
echo   Starting Application...
echo ==============================

REM 1. Supabase CLI を起動
supabase start

REM 2. React をコンテナで起動
docker compose up -d --build

echo.
echo Application is starting...
echo Please wait 20-30 seconds
echo Frontend: http://localhost:3000
echo Supabase Studio: http://localhost:54323
echo.

pause