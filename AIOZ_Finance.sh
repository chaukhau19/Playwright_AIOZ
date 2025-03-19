#!/bin/bash
set -e  

# Launch Xvfb in the background
Xvfb :99 -ac &  
XVFB_PID=$!  
export DISPLAY=:99
sleep 2  

# Make sure Xvfb is disabled when the script ends
cleanup() {
    echo "Stopping Xvfb..."
    kill $XVFB_PID || true
}
trap cleanup EXIT  

yarn test:All --workers=1

