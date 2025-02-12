@echo off
call yarn test:ConnectMetaMask --reporter=line --workers=1
call yarn test:DisconnectMetaMask --reporter=line --workers=1
call yarn test:SwitchNetworkMetaMask --reporter=line --workers=1
call yarn test:ConnectCoinBase --reporter=line --workers=1
call yarn test:DisconnectCoinBase --reporter=line --workers=1
call yarn test:SwitchNetworkCoinBase --reporter=line --workers=1
call yarn test:AIOZtoUSDT --reporter=line --workers=1
call yarn test:AIOZtoSTRK --reporter=line --workers=1
pause
