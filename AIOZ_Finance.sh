#!/bin/bash
set -e

# Xóa file lock nếu có
if [ -f /tmp/.X99-lock ]; then
    echo "Removing stale Xvfb lock file..."
    rm -f /tmp/.X99-lock
fi

# Dừng Xvfb nếu đã chạy
echo "Stopping any existing Xvfb instances..."
pkill -u $(whoami) Xvfb || true
sleep 1

# Khởi động Xvfb
echo "Starting Xvfb..."
Xvfb :99 -ac -screen 0 1920x1080x24 > /tmp/xvfb.log 2>&1 &
XVFB_PID=$!
export DISPLAY=:99
sleep 2

# Kiểm tra Xvfb đã chạy chưa
if ! ps -p $XVFB_PID > /dev/null; then
    echo "❌ Xvfb failed to start!"
    cat /tmp/xvfb.log
    exit 1
fi

# Cài đặt dependencies nếu cần
echo "Installing dependencies..."
yarn install --frozen-lockfile
npx playwright install

# Kiểm tra và cài đặt TypeScript nếu chưa có
if ! command -v tsc &> /dev/null; then
    echo "Installing TypeScript..."
    yarn global add typescript
fi

# Chạy test
echo "Running Playwright tests..."
yarn test:ConnectMetaMask --workers=1 || EXIT_CODE=$?

# Dừng Xvfb
echo "Stopping Xvfb..."
kill $XVFB_PID
wait $XVFB_PID 2>/dev/null  

# Kiểm tra lỗi test
if [[ -n "$EXIT_CODE" ]]; then
    echo "⚠️ Tests completed with non-zero exit code: $EXIT_CODE"
    exit $EXIT_CODE
fi

echo "✅ Tests completed successfully!"
read -p "Press Enter to continue..."
