#!/bin/bash

# Anti-Judol Simulator Linux Launcher

echo "=================================================="
echo "    Memulai Anti-Judol Simulator Game (Linux)     "
echo "=================================================="

# Pindah ke direktori script ini berada
cd "$(dirname "$0")"

# Mengecek apakah Node.js sudah terinstal
if ! command -v npm &> /dev/null; then
    echo "Error: Node.js/npm tidak ditemukan."
    echo "Harap pastikan Node.js sudah terinstal pada distro anda."
    read -p "Tekan Enter untuk keluar..."
    exit 1
fi

echo ">> Memeriksa dan menginstal dependencies..."
npm install

echo ">> Menjalankan server aplikasi..."
npm run dev -- --open

# Menunggu proses berjalan (tekan Ctrl+C untuk berhenti)
wait
