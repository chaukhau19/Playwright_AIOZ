# dAppwright Examples

This is a test dApp that shows the different ways you can integrate [dAppwright](https://github.com/TenKeyLabs/dappwright) into your test suite.

You can find the different configurations in the [tests folder](https://github.com/TenKeyLabs/dappwright-examples/tree/main/tests).

################################################################################################################################################
################################################################################################################################################
################################################################################################################################################

###### RUN ######

```bash
#Jenkins run on 1h sáng
on Jenkins server: /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main/AIOZ_Finance.sh
#Result Jenkins:
on ??


############
############
#Local run on 5h sáng
on Jenkins server: /var/lib/jenkins/workspace/Automation/AIOZ_Finance_Auto/run_on_remote_windows.sh
#Result Local: 
on Local


############
############
# Git run on 3h sáng
on Run Playwright tests: use CMD
#Result Git:
on ??

```
################################################################################################################################################
################################################################################################################################################
################################################################################################################################################

## Installation Library

```bash

git clone https://github.com/TenKeyLabs/dappwright-examples.git
cd dappwright-examples

########## LIBRARY ########## 
yarn install
npm install -g yarn
apt-get install -y nodejs
yarn playwright install
yarn add @playwright/test@latest @tenkeylabs/dappwright

npm install playwright axios

########## LOG ########## 
winget install --id Oracle.JDK.17
java -version
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"  
$env:Path+=";$env:JAVA_HOME\bin"

npm install -D allure-playwright
npm install -g allure-commandline
npm install -D @playwright/test allure-playwright

########## OPEN LOG ########## 
npx allure generate allure-results --clean
npx allure open

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

###### Running the dApp ######

In order to run the test dApp, it requires running both the application and local blockchain which requires two terminal sessions.

```bash
yarn dev # first terminal
yarn chain # second terminal
```

###### Additional Information ######

```bash
C:\Worker KhauNTC\Github\Playwright_AIOZ\playwright-report
C:\Users\aioz\AppData\Local\Temp\dappwright
```
```bash
Tất cả các cặp giao dịch đều tuân theo quy trình hoán đổi token tuần hoàn.
Bắt đầu với số dư 500 mỗi loại, thực hiện các giao dịch để đạt đến một trạng thái giới hạn (1000/0 hoặc 0/1000), sau đó quay về trạng thái ban đầu.
Xác minh rằng hệ thống xử lý đúng logic giao dịch và số dư phản ánh chính xác sau mỗi bước
```

################################################################################################################################################
################################################################################################################################################
################################################################################################################################################

###### Additional Jenkins ######
```bash
########################################################################
# Kiểm tra phiên bản
node -v
npm -v
yarn -v
playwright --version
npm playwright --version
yarn playwright --version

########################################################################
#Folder
cd /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main
cd /var/lib/jenkins/.cache/ms-playwright

########################################################################
#Xóa và cài lại node_modules và esbuild
rm -rf node_modules package-lock.json yarn.lock
npm install
npm install esbuild --force
ls -l node_modules/esbuild/bin/

########################################################################
# Kiểm tra thư mục làm việc
ls -lah /var/lib/jenkins/workspace/

########################################################################
# Tìm kiếm file Jenkinsfile
find / -type f -name "Jenkinsfile" 2>/dev/null
du -ah ~ | grep "Jenkinsfile"

########################################################################
# Cài đặt Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

########################################################################
# Hoặc nếu dùng yarn
yarn add ethers

########################################################################
# Hoặc nếu dùng npm
npm install ethers

########################################################################
# Cài đặt Yarn
npm uninstall -g yarn
npm install -g yarn

########################################################################
# Cài đặt npm
npm uninstall playwright
npm install playwright@1.48.2

########################################################################
# Cài đặt Playwright và dependencies
rm -rf node_modules yarn.lock
yarn install
yarn playwright install
yarn playwright install --with-deps
yarn add @playwright/test@latest @tenkeylabs/dappwright
yarn add @playwright/testt@1.48.2 @tenkeylabs/dappwright

###########################
rm -rf node_modules package-lock.json yarn.lock
npm install -g playwright@1.48.2
npm install  # Hoặc dùng yarn nếu đang dùng yarn
npx playwright install
npx playwright install --with-deps
npm install @playwright/test@latest @tenkeylabs/dappwright

########################################################################
# Xóa cài đặt Playwright và dependencies
yarn remove @playwright/test @tenkeylabs/dappwright
rm -rf node_modules package-lock.json yarn.lock
npm uninstall @playwright/test @tenkeylabs/dappwright
rm -rf node_modules package-lock.json yarn.lock

########################################################################
# Cài đặt Xvfb
sudo apt-get install -y xvfb

########################################################################
# Gỡ cài đặt Xvfb
sudo apt-get remove --purge -y xvfb
sudo apt-get autoremove -y
sudo apt-get clean

########################################################################
# Kiểm tra xem Xvfb có đang chạy không
ps aux | grep Xvfb

########################################################################
#Trong Jenkinsfile, cập nhật command để chạy test như sau:
xvfb-run --auto-servernum yarn test

########################################################################
# Kiểm tra log hệ thống của Jenkins
sudo journalctl -u jenkins --no-pager | tail -n 50

########################################################################
# Kiểm tra logs trong thư mục Jenkins
cat /var/log/jenkins/jenkins.log | tail -n 50

########################################################################
#Cài đặt Chromium vào thư mục cụ thể
mkdir -p /var/lib/jenkins/.cache/ms-playwright/chromium-1148/
cd /var/lib/jenkins/.cache/ms-playwright/chromium-1148/
wget https://playwright.azureedge.net/builds/chromium/1148/chromium-linux.zip

unzip chromium-linux.zip
mv chrome-linux /var/lib/jenkins/.cache/ms-playwright/chromium-1148/

chmod -R 755 /var/lib/jenkins/.cache/ms-playwright/
chown -R jenkins:jenkins /var/lib/jenkins/.cache/ms-playwright/
chmod +x /var/lib/jenkins/.cache/ms-playwright/chromium-1148/chrome-linux/chrome
########################################################################
ln -s chromium-1148/ chromium-1150


```

################################################################################################################################################
################################################################################################################################################
################################################################################################################################################

###### Error Jenkins ######
```bash
########################################################################
# stderr: error: unable to unlink old 'dist/assets/index-b6bb3e45.js': Permission denied
# error: unable to unlink old 'dist/assets/index-dfec0afb.css': Permission denied
sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main
sudo chmod -R 755 /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main
git reset --hard HEAD
git clean -fd
#######
OR DELETE Automation_AIOZ_Finance_main

########################################################################
# TimeoutError: browserContext.waitForEvent: Timeout 30000ms exceeded while waiting for event "page"
#> |   await wallet.approve();
sudo apt-get install -y xvfb

########################################################################
# Error: Playwright Test did not expect test.beforeAll() to be called here.
# Most common reasons include:
# - You are calling test.beforeAll() in a configuration file.
# - You are calling test.beforeAll() in a file that is imported by the configuration file.
# - You have two different versions of @playwright/test. This usually happens
#   when one of the dependencies in your package.json depends on @playwright/test.
# > 16 | test.beforeAll(async ({ page, wallet }) => {
#      |      ^


########################################################################
#Executable doesn't exist at /var/lib/jenkins/.cache/ms-playwright/chromium-1148/chrome-linux/chrome
ln -s chromium-1148/ chromium-1150
mv /var/lib/jenkins/.cache/ms-playwright/chromium-1155 /var/lib/jenkins/.cache/ms-playwright/chromium-1148

########################################################################
#Error: EACCES: permission denied, scandir '/tmp/dappwright/session/metamask/0'
#Error: EACCES: permission denied, scandir '/tmp/dappwright/session/metamask/1'

sudo chmod -R 777 /tmp/dappwright/session/
sudo chmod -R 777 /tmp/dappwright/session/metamask

chmod -R 777 /tmp/dappwright/session/
chmod -R 777 /tmp/dappwright/session/metamask
########################################################################
#npm error [Error: EACCES: permission denied, rename '/usr/lib/node_modules/yarn' -> '/usr/lib/node_modules/.yarn-LH7MXRbz'] 

########################################################################
#Error: browserContext.newPage: Target page, context or browser has been closed
#Call log:
#   [2m  - navigating to "chrome-extension://gadekpdjmpjjnnemgnhkbjgnjpdaakgh/home.html", waiting until "load"[22m

//sudo apt-get update && sudo apt-get install -y x11-utils
// Xvfb :99 -screen 0 1920x1080x24 &
// export DISPLAY=:99
// xdpyinfo -display :99 || (echo " Xvfb failed to start" && exit 1)

########################################################################
# TimeoutError: browserContext.waitForEvent: Timeout 30000ms exceeded while waiting for event "page"
#    > |             await wallet.reject();
#    > |             await wallet.confirmTransaction();
changed headless: true ===> headless: false on setup metamask

########################################################################
#-bash: ./AIOZ_Finance.sh: Permission denied
chmod +x AIOZ_Finance.sh

########################################################################
# src/walletExtension.ts:2:43 - error TS2307: Cannot find module 'ethers/types/providers' or its corresponding type declarations.
# 2 import { Eip1193Provider, Provider } from "ethers/types/providers";
Mở file src/walletExtension.ts, tìm dòng:
import { Eip1193Provider, Provider } from "ethers/types/providers";
Cách sửa đúng trong ethers v6:
Thay thế bằng: import { BrowserProvider, Eip1193Provider } from "ethers";

########################################################################
# Looks like you launched a headed browser without having a XServer running.                     
# Set either 'headless: true' or use 'xvfb-run <your-playwright-app>' before running Playwright.


########################################################################
# libEGL warning: failed to open /dev/dri/card0: Permission denied
./AIOZ_Finance.sh --disable-gpu
export DISPLAY=:0

########################################################################
# Error: EBUSY: resource busy or locked, unlink 'C:\Users\BVSSH_~1\AppData\Local\Temp\dappwright\session\metamask\1\Default\Affiliation Database'
Restart PC

########################################################################
# Error: EACCES: permission denied, unlink '/var/lib/jenkins/workspace/Automation_AIOZ_Finance_main/test-results/Swap-Invalid_Swap-AIOZ_to_-6a5e2-ked-token-spending-approval-chrome/trace.zip'

```

################################################################################################################################################
################################################################################################################################################
################################################################################################################################################
