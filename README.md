# dAppwright Examples

This is a test dApp that shows the different ways you can integrate [dAppwright](https://github.com/TenKeyLabs/dappwright) into your test suite.

You can find the different configurations in the [tests folder](https://github.com/TenKeyLabs/dappwright-examples/tree/main/tests).

## Installation

```bash
git clone https://github.com/TenKeyLabs/dappwright-examples.git
cd dappwright-examples
yarn install
npm install playwright axios
```

Additionally, you need to install the required browsers for Playwright:

```bash
yarn playwright install
```

## Running the examples

You can run all of the examples with any of these commands:

```bash
yarn test:All
```

Or you can specify an example configuration with:

```bash
yarn test:ConnectMetaMask
yarn test:ConnectCoinBase  
yarn test:ConnectMetaMask && yarn test:ConnectCoinBase
```

## Running the dApp

In order to run the test dApp, it requires running both the application and local blockchain which requires two terminal sessions.

```bash
yarn dev # first terminal
yarn chain # second terminal
```

## Additional Information

```bash
C:\Worker KhauNTC\Github\Playwright_AIOZ\playwright-report
C:\Users\aioz\AppData\Local\Temp\dappwright
```
```bash
Tất cả các cặp giao dịch đều tuân theo quy trình hoán đổi token tuần hoàn.
Bắt đầu với số dư 500 mỗi loại, thực hiện các giao dịch để đạt đến một trạng thái giới hạn (1000/0 hoặc 0/1000), sau đó quay về trạng thái ban đầu.
Xác minh rằng hệ thống xử lý đúng logic giao dịch và số dư phản ánh chính xác sau mỗi bước
```

## Additional Jenkins
```bash
# Kiểm tra phiên bản
node -v
npm -v
yarn -v
npm playwright --version
yarn playwright --version

# Kiểm tra thư mục làm việc
ls -lah /var/lib/jenkins/workspace/

# Tìm kiếm file Jenkinsfile
find / -type f -name "Jenkinsfile" 2>/dev/null
du -ah ~ | grep "Jenkinsfile"

# Cài đặt Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Hoặc nếu dùng yarn
yarn add ethers

# Hoặc nếu dùng npm
npm install ethers

# Cài đặt Yarn
npm install -g yarn

# Gỡ cài đặt Yarn
npm uninstall -g yarn

# Cài đặt Playwright và dependencies
rm -rf node_modules yarn.lock
yarn install
yarn playwright install
yarn playwright install --with-deps
yarn add @playwright/test@latest @tenkeylabs/dappwright

rm -rf node_modules package-lock.json yarn.lock
npm install  # Hoặc dùng yarn nếu đang dùng yarn
npx playwright install
npx playwright install --with-deps
npm install @playwright/test@latest @tenkeylabs/dappwright

# Xóa cài đặt Playwright và dependencies
yarn remove @playwright/test @tenkeylabs/dappwright
rm -rf node_modules package-lock.json yarn.lock
npm uninstall @playwright/test @tenkeylabs/dappwright
rm -rf node_modules package-lock.json yarn.lock


# Cài đặt Xvfb
sudo apt-get install -y xvfb

# Gỡ cài đặt Xvfb
sudo apt-get remove --purge -y xvfb
sudo apt-get autoremove -y
sudo apt-get clean

# Kiểm tra xem Xvfb có đang chạy không
ps aux | grep Xvfb

#Trong Jenkinsfile, cập nhật command để chạy test như sau:
xvfb-run --auto-servernum yarn test

# Kiểm tra log hệ thống của Jenkins
sudo journalctl -u jenkins --no-pager | tail -n 50

# Kiểm tra logs trong thư mục Jenkins
cat /var/log/jenkins/jenkins.log | tail -n 50

```