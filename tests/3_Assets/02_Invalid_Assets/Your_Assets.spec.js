//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { assetsconfig } from "./../../../data/Assets_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { InvalidAssetsPage } from "../../../pages/3_Assets/02_Invalid_Assets/Your_Assets.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let invalidAssetsPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  invalidAssetsPage = new InvalidAssetsPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
