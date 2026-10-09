@echo off
chcp 65001 >nul
title Qalam - Ishga tushirish
echo ==========================================
echo        QALAM - BLOG PLATFORMASI
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo XATOLIK: Node.js topilmadi.
  echo Avval Node.js LTS versiyasini o'rnating, keyin bu faylni qayta oching.
  echo https://nodejs.org/
  pause
  exit /b 1
)

where pnpm >nul 2>nul
if errorlevel 1 (
  echo pnpm topilmadi. Uni Corepack orqali yoqishga harakat qilamiz...
  call corepack enable
  call corepack prepare pnpm@latest --activate
)

where pnpm >nul 2>nul
if errorlevel 1 (
  echo pnpm ishga tushmadi. VS Code terminalida quyidagilarni bajaring:
  echo corepack enable
  echo pnpm install
  pause
  exit /b 1
)

if not exist node_modules (
  echo Kerakli paketlar birinchi marta o'rnatilmoqda...
  call pnpm install
  if errorlevel 1 (
    echo Paketlarni o'rnatishda xatolik yuz berdi.
    pause
    exit /b 1
  )
)

echo.
echo Qalam saytini ishga tushiryapmiz...
echo Brauzerda http://localhost:3000 manzilini oching.
echo Saytni to'xtatish uchun ushbu oynada Ctrl+C bosing.
echo.
call pnpm dev
pause
