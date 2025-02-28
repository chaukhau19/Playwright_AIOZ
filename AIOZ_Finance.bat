@echo off
setlocal enabledelayedexpansion

:: Khởi động Xvfb (không cần trên Windows)
:: set -e không có trong Windows, thay bằng `if errorlevel 1 exit /b 1`

:: Thiết lập Display giả lập (bỏ qua trên Windows)
set DISPLAY=:99

:: Chạy lệnh kiểm thử
yarn test:ConnectMetaMask --workers=1

:: Dừng Xvfb (không áp dụng trên Windows)

:: Đợi người dùng nhấn Enter để thoát
pause













@REM ////////////////////////////////////////////////////////////////////////////////////////////////////////


@REM @echo off

@REM call yarn test:ConnectMetaMask --workers=1 
@REM call yarn test:DisconnectMetaMask --workers=1 
@REM call yarn test:SwitchNetworkMetaMask --workers=1

@REM call yarn test:ConnectCoinBase --workers=1
@REM call yarn test:DisconnectCoinBase --workers=1
@REM call yarn test:SwitchNetworkCoinBase --workers=1

@REM call yarn test:Swap_AIOZtoUSDT_Valid --workers=1
@REM call yarn test:Swap_AIOZtoSTRK_Valid --workers=1
@REM call yarn test:Swap_STRKtoAIOZ_Valid --workers=1
@REM call yarn test:Swap_USDTtoAIOZ_Valid --workers=1
@REM call yarn test:Swap_AIOZtoWAIOZ_Valid --workers=1

@REM call yarn test:Swap_AIOZtoSTRK_Invalid --workers=1
@REM call yarn test:Swap_AIOZtoUSDT_Invalid --workers=1
@REM call yarn test:Swap_STRKtoAIOZ_Invalid --workers=1
@REM call yarn test:Swap_USDTtoAIOZ_Invalid --workers=1

@REM call yarn test:AllFixed --workers=1

@REM pause
