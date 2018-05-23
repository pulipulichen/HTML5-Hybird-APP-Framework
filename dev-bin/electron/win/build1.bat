cd %~dp0
cd ..\..\..\www
rmdir /S /Q hybird-app-win32-x64
npm run package-win
