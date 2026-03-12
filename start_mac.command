#!/bin/bash

# Anti-Judol Simulator Mac Launcher

echo "=================================================="
echo "    Memulai Anti-Judol Simulator Game (Mac)       "
echo "=================================================="

# Pindah ke direktori script ini berada
cd "$(dirname "$0")"

# Mengecek apakah Node.js sudah terinstal
if ! command -v npm &> /dev/null; then
    echo "Error: Node.js/npm tidak ditemukan."
    echo "Harap pastikan Node.js sudah terinstal (https://nodejs.org/)."
    read -p "Tekan Enter untuk keluar..."
    exit 1
fi

echo ">> Memeriksa dan menginstal dependencies..."
npm install

echo ">> Membuka browser..."
# Menggunakan osascript atau mengatur delay kecil agar server bisa start sebelum browser dibuka (Vite punya fitur auto open jg, tapi kadang delay)
# vite punya fitur config server.open: true

echo ">> Menjalankan server aplikasi..."
npm run dev -- --open

# Menunggu proses berjalan (tekan Ctrl+C untuk berhenti)
wait
