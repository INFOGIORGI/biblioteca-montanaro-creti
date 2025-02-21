@echo off
cd /d "%~dp0"

:: Avvia il backend Flask in una nuova finestra
start cmd /k "cd Backend && python app.py"

:: Aspetta un paio di secondi per dare tempo al backend di avviarsi
timeout /t 3

:: Avvia il frontend React (Vite) in una nuova finestra
start cmd /k "cd Frontend && npm install && npm run dev"

echo I servizi sono stati avviati!
