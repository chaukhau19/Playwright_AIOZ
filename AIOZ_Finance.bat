@echo off

call yarn test:ConnectMetaMask --workers=1 
call yarn test:DisconnectMetaMask --workers=1 
call yarn test:SwitchNetworkMetaMask --workers=1

call yarn test:ConnectCoinBase --workers=1
call yarn test:DisconnectCoinBase --workers=1
call yarn test:SwitchNetworkCoinBase --workers=1

call yarn test:Swap_AIOZtoUSDT_Valid --workers=1
call yarn test:Swap_AIOZtoSTRK_Valid --workers=1
call yarn test:Swap_STRKtoAIOZ_Valid --workers=1
call yarn test:Swap_USDTtoAIOZ_Valid --workers=1
call yarn test:Swap_AIOZtoWAIOZ_Valid --workers=1

call yarn test:Swap_AIOZtoSTRK_Invalid --workers=1
call yarn test:Swap_AIOZtoUSDT_Invalid --workers=1
call yarn test:Swap_STRKtoAIOZ_Invalid --workers=1
call yarn test:Swap_USDTtoAIOZ_Invalid --workers=1

@REM call yarn test:AllFixed1 --workers=1
@REM call yarn test:AllFixed2 --workers=1
@REM call yarn test:AllFixed3 --workers=1
pause
