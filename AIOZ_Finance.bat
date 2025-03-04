@echo off
@REM cd /d C:\Worker_KhauNTC\Github\Playwright_AIOZ

echo Checking Yarn location...
where yarn

echo Checking Yarn version...
yarn --version

echo Running Playwright test...
call yarn test:Swap --workers=1

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
