@echo off

call yarn test:ConnectMetaMask --workers=1 
call yarn test:DisconnectMetaMask --workers=1 
call yarn test:SwitchNetworkMetaMask --workers=1

call yarn test:ConnectCoinBase --workers=1
call yarn test:DisconnectCoinBase --workers=1
call yarn test:SwitchNetworkCoinBase --workers=1

call yarn test:AIOZtoUSDT_Valid --workers=1
call yarn test:AIOZtoSTRK_Valid --workers=1
call yarn test:STRKtoAIOZ_Valid --workers=1
call yarn test:USDTtoAIOZ_Valid --workers=1
call yarn test:AIOZtoWAIOZ_Valid --workers=1

call yarn test:AIOZtoSTRK_Invalid --workers=1

@REM call yarn test:AllFixed1 --workers=1
@REM call yarn test:AllFixed2 --workers=1
@REM call yarn test:AllFixed3 --workers=1
pause
