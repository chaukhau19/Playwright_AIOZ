#!/bin/bash
set -e  

# Kiểm tra nếu Xvfb đang chạy, nếu có thì dừng nó
if pgrep Xvfb > /dev/null; then
    echo "Stopping existing Xvfb process..."
    killall Xvfb
    sleep 1
fi

# Khởi động Xvfb
echo "Starting Xvfb..."
Xvfb :99 -ac &  
XVFB_PID=$!  
export DISPLAY=:99
sleep 2  

# Kiểm tra xem Xvfb có khởi động thành công không
if ! ps -p $XVFB_PID > /dev/null; then
    echo "Xvfb failed to start!"
    exit 1
fi

# Chạy Playwright test
echo "Running Playwright tests..."
yarn test:ConnectMetaMask --workers=1

# Cleanup Xvfb
echo "Stopping Xvfb..."
kill $XVFB_PID
wait $XVFB_PID 2>/dev/null  

echo "Test execution completed!"
read -p "Press Enter to continue..."
