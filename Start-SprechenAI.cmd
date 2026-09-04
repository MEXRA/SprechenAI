@echo off
chcp 65001 >nul
setlocal

set "SPRECHEN_ROOT=%~dp0"
set "NODE_DIR=C:\Program Files\nodejs"

if not exist "%NODE_DIR%\node.exe" (
  echo [HATA] Node.js bulunamadi. Once Node.js LTS kurmalisin.
  pause
  exit /b 1
)

where dotnet >nul 2>nul
if errorlevel 1 (
  echo [HATA] .NET SDK bulunamadi. Once .NET 9 SDK kurmalisin.
  pause
  exit /b 1
)

set "PATH=%NODE_DIR%;%PATH%"

if not exist "%SPRECHEN_ROOT%frontend\node_modules\next\package.json" (
  echo Frontend paketleri kuruluyor...
  pushd "%SPRECHEN_ROOT%frontend"
  call npm.cmd install
  if errorlevel 1 (
    popd
    echo [HATA] Frontend paketleri kurulamadi.
    pause
    exit /b 1
  )
  popd
)

echo SprechenAI backend baslatiliyor...
start "SprechenAI Backend" /D "%SPRECHEN_ROOT%backend" cmd.exe /k dotnet run --project SprechenAI.Api\SprechenAI.Api.csproj --launch-profile http

echo SprechenAI frontend baslatiliyor...
start "SprechenAI Frontend" /D "%SPRECHEN_ROOT%frontend" cmd.exe /k npm.cmd run dev

echo Uygulamanin hazir olmasi bekleniyor...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$deadline=(Get-Date).AddSeconds(40); while((Get-Date) -lt $deadline){try{$result=Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2;if($result.StatusCode -eq 200){exit 0}}catch{};Start-Sleep -Milliseconds 500};exit 1"

if errorlevel 1 (
  echo [HATA] Frontend 40 saniye icinde acilmadi. Acilan Frontend penceresindeki hatayi kontrol et.
  pause
  exit /b 1
)

echo SprechenAI hazir. Tarayici aciliyor...
start "" "http://localhost:3000"
endlocal
