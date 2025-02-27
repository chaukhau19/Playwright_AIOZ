#!/bin/bash
# set -e 

# Xvfb :99 -ac &
# XVFB_PID=$!  
# export DISPLAY=:99
# sleep 2  

yarn test:ConnectMetaMask --workers=1

# kill $XVFB_PID

# read -p "Press Enter to continue..."
