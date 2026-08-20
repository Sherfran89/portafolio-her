@echo off
title Actualizar Portafolio en Vercel y GitHub
cd /d C:\Users\herna\OneDrive\Escritorio\Proyectos\Portafolio
echo ========================================================
echo   ACTUALIZANDO PORTAFOLIO EN GITHUB Y VERCEL
echo ========================================================
echo.
echo 1. Agregando archivos modificados...
git add -A
echo.
echo 2. Creando commit de actualizacion...
git commit -m feat: actualizacion automatica de portafolio
echo.
echo 3. Subiendo cambios a GitHub (Vercel iniciara despliegue)...
git push origin main
echo.
echo ========================================================
echo   LISTO! Vercel desplegara tu sitio en 1-2 minutos.
echo   https://portafolio-her.vercel.app/
echo ========================================================
pause
