//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { exploreconfig } from "./../../../data/Explore_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { ValidExplorePoolsPage } from "../../../pages/Explore/Valid_Explore/Explore_Pools.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let validExplorePoolsPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  validExplorePoolsPage = new ValidExplorePoolsPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
