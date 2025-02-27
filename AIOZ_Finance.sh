#!/bin/bash
set -e  # Dừng script nếu có lỗi

# Khởi động Xvfb (chạy trình duyệt trong môi trường không có GUI)
Xvfb :99 -ac &
XVFB_PID=$!  # Lưu PID của Xvfb để tắt sau khi test xong
export DISPLAY=:99

# Chờ Xvfb khởi động hoàn toàn
sleep 2  

# Chạy test
yarn test:ConnectMetaMask --workers=1

# Uncomment nếu cần chạy thêm test khác
# yarn test:DisconnectMetaMask --workers=1
# yarn test:SwitchNetworkMetaMask --workers=1

# Dừng Xvfb sau khi test xong
kill $XVFB_PID

# Giữ terminal mở để debug (nếu cần)
read -p "Press Enter to continue..."
