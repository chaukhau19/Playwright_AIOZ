#!/bin/bash


@echo off
call yarn test:ConnectMetaMask --reporter=line --workers=1
call yarn test:DisconnectMetaMask --reporter=line --workers=1
call yarn test:SwitchNetworkMetaMask --reporter=line --workers=1

call yarn test:ConnectCoinBase --reporter=line --workers=1
call yarn test:DisconnectCoinBase --reporter=line --workers=1
call yarn test:SwitchNetworkCoinBase --reporter=line --workers=1

call yarn test:AIOZtoUSDT_Valid --reporter=line --workers=1
call yarn test:AIOZtoSTRK_Valid --reporter=line --workers=1
call yarn test:STRKtoAIOZ_Valid --reporter=line --workers=1
call yarn test:USDTtoAIOZ_Valid --reporter=line --workers=1
call yarn test:AIOZtoWAIOZ_Valid --reporter=line --workers=1

call yarn test:AIOZtoSTRK_Invalid --reporter=line --workers=1
pause








@REM set "REPORT_DIR=./playwright-report"

@REM :: Tạo thư mục nếu chưa tồn tại
@REM if not exist %REPORT_DIR% (
@REM     mkdir %REPORT_DIR%
@REM )

@REM :: Chạy từng test với --workers=1 và lưu log riêng vào playwright-report
@REM call yarn test:ConnectMetaMask --reporter=json --workers=1 >> %REPORT_DIR%/ConnectMetaMask.json
@REM call yarn test:DisconnectMetaMask --reporter=json --workers=1 >> %REPORT_DIR%/DisconnectMetaMask.json

@REM @REM call yarn test:SwitchNetworkMetaMask --reporter=json --workers=1 > %REPORT_DIR%/SwitchNetworkMetaMask.json

@REM @REM call yarn test:ConnectCoinBase --reporter=json --workers=1 > %REPORT_DIR%/ConnectCoinBase.json
@REM @REM call yarn test:DisconnectCoinBase --reporter=json --workers=1 > %REPORT_DIR%/DisconnectCoinBase.json
@REM @REM call yarn test:SwitchNetworkCoinBase --reporter=json --workers=1 > %REPORT_DIR%/SwitchNetworkCoinBase.json

@REM @REM call yarn test:AIOZtoUSDT_Valid --reporter=json --workers=1 > %REPORT_DIR%/AIOZtoUSDT_Valid.json
@REM @REM call yarn test:AIOZtoSTRK_Valid --reporter=json --workers=1 > %REPORT_DIR%/AIOZtoSTRK_Valid.json
@REM @REM call yarn test:STRKtoAIOZ_Valid --reporter=json --workers=1 > %REPORT_DIR%/STRKtoAIOZ_Valid.json
@REM @REM call yarn test:USDTtoAIOZ_Valid --reporter=json --workers=1 > %REPORT_DIR%/USDTtoAIOZ_Valid.json
@REM @REM call yarn test:AIOZtoWAIOZ_Valid --reporter=json --workers=1 > %REPORT_DIR%/AIOZtoWAIOZ_Valid.json



@REM :: Gộp tất cả JSON thành 1 file (nếu có ít nhất 1 file JSON)
@REM (for %%f in (%REPORT_DIR%\*.json) do type "%%f") > %REPORT_DIR%\Report.json

@REM :: Chạy script JavaScript từ thư mục Libs
@REM node Libs\convert_log_to_html.js

@REM :: Kiểm tra nếu Log.html tồn tại trước khi mở
@REM if exist %REPORT_DIR%\Log.html (
@REM     start %REPORT_DIR%\Log.html
@REM ) else (
@REM     echo ❌ Lỗi: Không tạo được Log.html!
@REM )
