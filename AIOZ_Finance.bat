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
pause
