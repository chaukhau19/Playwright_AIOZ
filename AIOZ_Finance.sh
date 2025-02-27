#!/bin/bash
set -e  # Stop the script if there is an error

Xvfb :99 -ac &
XVFB_PID=$!  # Save the PID of Xvfb to stop it after tests are done
export DISPLAY=:99
sleep 2  

# yarn test:ConnectMetaMask --workers=1 
# yarn test:DisconnectMetaMask --workers=1 
# yarn test:SwitchNetworkMetaMask --workers=1

# yarn test:ConnectCoinBase --workers=1
# yarn test:DisconnectCoinBase --workers=1
# yarn test:SwitchNetworkCoinBase --workers=1

# yarn test:Swap_AIOZtoUSDT_Valid --workers=1
# yarn test:Swap_AIOZtoSTRK_Valid --workers=1
# yarn test:Swap_STRKtoAIOZ_Valid --workers=1
# yarn test:Swap_USDTtoAIOZ_Valid --workers=1
# yarn test:Swap_AIOZtoWAIOZ_Valid --workers=1

# yarn test:Swap_AIOZtoSTRK_Invalid --workers=1
# yarn test:Swap_AIOZtoUSDT_Invalid --workers=1
# yarn test:Swap_STRKtoAIOZ_Invalid --workers=1
# yarn test:Swap_USDTtoAIOZ_Invalid --workers=1

DEBUG=pw:api yarn test:AllFixed --workers=1

kill $XVFB_PID

# Keep the terminal open for debugging (if needed)
read -p "Press Enter to continue..."

