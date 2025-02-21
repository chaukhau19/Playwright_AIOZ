//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { config } from "./../../../data/Swap_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Swap/Swap_Functions.js";
//Dedicated functions
import { ValidSwapPage } from "../../../pages/Swap/Valid_Swap/AIOZ_to_STRK.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let validSwapPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  validSwapPage = new ValidSwapPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Swap with different input values", { timeout: 180000 }, async ({ page, wallet }) => {
  console.log("Swap with different input values");
  for (const inputValue of config.InputValues) {
    try {
      await validSwapPage.SwapWithInputValue(wallet, inputValue);
      await page.waitForTimeout(3000);
      await page.reload();
    } catch (error) {
      throw error;
    }
  }
});

test("Swap with half value", async ({ wallet }) => { 
  console.log("Swap with half value");
  await functionPage.TimeoutTest(validSwapPage.SwapWithValueHalf.bind(validSwapPage), wallet);
});

test("Swap while network is down", async ({ wallet }) => { 
  console.log("Swap while network is down");
  await functionPage.TimeoutTest(validSwapPage.SwapWithNetworkIssue.bind(validSwapPage), wallet);
});

test("Swap with long pending time", async ({ wallet }) => { 
  console.log("Swap with long pending time");
  await functionPage.TimeoutTest(validSwapPage.SwapWithLongPendingTime.bind(validSwapPage), wallet);
});

// WAITING FOR FIX Compare_Token_Before_And_After_Valid_Swap
test("Swap with max value", async ({ wallet }) => { 
  console.log("Swap with max value");
  await functionPage.TimeoutTest(validSwapPage.SwapWithValueMax.bind(validSwapPage), wallet);
  console.log("Swap with back half value");
  await functionPage.TimeoutTest(validSwapPage.BackToken.bind(validSwapPage), wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
