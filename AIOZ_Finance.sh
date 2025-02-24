#!/bin/bash

# yarn test:ConnectMetaMask --workers=1
# yarn test:DisconnectMetaMask --workers=1
# yarn test:SwitchNetworkMetaMask --workers=1

# yarn test:ConnectCoinBase --workers=1
# yarn test:DisconnectCoinBase --workers=1
# yarn test:SwitchNetworkCoinBase --workers=1

# yarn test:AIOZtoUSDT_Valid --workers=1
# yarn test:AIOZtoSTRK_Valid --workers=1
# yarn test:STRKtoAIOZ_Valid --workers=1
# yarn test:USDTtoAIOZ_Valid --workers=1
# yarn test:AIOZtoWAIOZ_Valid --workers=1

# yarn test:AIOZtoSTRK_Invalid --workers=1
# yarn test:AIOZtoUSDT_Invalid --workers=1
# yarn test:STRKtoAIOZ_Invalid --workers=1
# yarn test:USDTtoAIOZ_Invalid --workers=1

# Uncomment these lines if needed
# yarn test:AllFixed1 --workers=1
# yarn test:AllFixed2 --workers=1
# yarn test:AllFixed3 --workers=1

yarn test:All --workers=1

read -p "Press Enter to continue..."
