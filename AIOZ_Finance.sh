#!/bin/bash
set -e  

# Khởi chạy Xvfb trong nền
Xvfb :99 -ac &  
XVFB_PID=$!  
export DISPLAY=:99
sleep 2  

# Đảm bảo Xvfb bị tắt khi script kết thúc
cleanup() {
    echo "Stopping Xvfb..."
    kill $XVFB_PID || true
}
trap cleanup EXIT  

yarn test:Swap --workers=1




##############################################################
# #!/bin/bash
# set -e 

# Xvfb :99 -ac &
# XVFB_PID=$!  
# export DISPLAY=:99
# sleep 2  

# yarn test:ConnectMetaMask --workers=1

# kill $XVFB_PID

# read -p "Press Enter to continue..."
