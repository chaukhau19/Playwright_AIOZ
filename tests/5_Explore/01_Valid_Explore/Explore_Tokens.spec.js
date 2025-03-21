//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { exploreconfig } from "./../../../data/Explore_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { ValidExploreTokensPage } from "../../../pages/5_Explore/01_Valid_Explore/Explore_Tokens.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let validExploreTokensPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  validExploreTokensPage = new ValidExploreTokensPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
