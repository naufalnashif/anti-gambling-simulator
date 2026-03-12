@echo off
title Anti-Judol Simulator Game

echo ==================================================
echo     Memulai Anti-Judol Simulator Game (Windows)     
echo ==================================================

:: Pindah ke direktori script ini berada
cd /d "%~dp0"

:: Mengecek apakah Node.js sudah terinstal
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js/npm tidak ditemukan.
    echo Harap pastikan Node.js sudah terinstal ^(https://nodejs.org/^).
    pause
    exit /b 1
)

echo ^>^> Memeriksa dan menginstal dependencies...
call npm install

echo ^>^> Menjalankan server aplikasi...
call npm run dev -- --open

:: Menunggu proses berjalan (tekan Ctrl+C untuk berhenti)
pause
