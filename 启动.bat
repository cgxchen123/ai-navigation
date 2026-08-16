@echo off
title AI 导航站
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo   ========================================
echo     AI 导航站 本地服务器
echo   ========================================
echo.

:: 查找 Python
set PYTHON_PATH=
for %%i in (python python3) do (
    for /f "tokens=*" %%p in ('where %%i 2^>nul') do set PYTHON_PATH=%%p
)

if "%PYTHON_PATH%"=="" (
    echo [错误] 未找到 Python
    echo.
    echo 请先安装 Python: https://www.python.org/downloads/
    echo 安装时请勾选「Add Python to PATH」选项。
    echo.
    pause
    exit /b 1
)

echo [OK] Python: %PYTHON_PATH%
echo [OK] 地址: http://127.0.0.1:3210
echo.
echo 正在启动服务器...
echo.

start "" "%PYTHON_PATH%" server.py
timeout /t 3 /nobreak >nul
start "" http://127.0.0.1:3210

echo ========================================
echo   [成功] 浏览器已打开！
echo   地址: http://127.0.0.1:3210
echo ========================================
echo.
echo 提示: 可关闭此窗口，服务器会在后台继续运行
echo       要停止服务器，请关闭上面的 Python 窗口
echo.
