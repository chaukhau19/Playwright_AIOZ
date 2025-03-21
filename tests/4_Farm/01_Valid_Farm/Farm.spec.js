//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { farmconfig } from "./../../../data/Farm_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { ValidFarmPage } from "../../../pages/4_Farm/01_Valid_Farm/Farm.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let validFarmPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  validFarmPage = new ValidFarmPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Create Incentive USDT/AIOZ 0.01%", async ({ wallet }) => { 
  console.log("Create Incentive USDT/AIOZ 0.01%");
  await functionPage.TimeoutTest(validFarmPage.Create_Incentive.bind(validFarmPage), wallet);
});

test("Create Incentive USDT/AIOZ 0.05%", async ({ wallet }) => { 
});

test("Create Incentive USDT/AIOZ 0.3%", async ({ wallet }) => { 
});

test("Create Incentive USDT/AIOZ 1%", async ({ wallet }) => { 
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Create Incentive and check status active", async ({ wallet }) => { 
  console.log("Create Incentive and check status active");
  await functionPage.TimeoutTest(validFarmPage.CheckStatusIncentive.bind(validFarmPage), wallet);
});

test("Stake token", async ({ wallet }) => { 
  console.log("Stake token");
  await functionPage.TimeoutTest(validFarmPage.Stake_Token.bind(validFarmPage), wallet);
});
