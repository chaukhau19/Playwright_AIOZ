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
      // console.log(`✅ Completed test for input: ${inputValue}`);
    } catch (error) {
      throw error;
      // console.error(`❌ Test failed with input value ${inputValue}:`, error);
    }
  }
});

test("Swap with half value", { timeout: 180000 }, async ({ wallet }) => { 
  console.log("Swap with half value");
  const swapPromise = validSwapPage.SwapWithValueHalf(wallet);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Test case timed out!")), 180000)
  );
  try {
    await Promise.race([swapPromise, timeoutPromise]);
  } catch (error) {
    throw error; 
  }
});

test("Swap while network is down", { timeout: 180000 }, async ({ wallet }) => { 
  console.log("Swap while network is down");
  const swapPromise = validSwapPage.SwapWithNetworkIssue(wallet);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Test case timed out!")), 180000)
  );
  try {
    await Promise.race([swapPromise, timeoutPromise]);
  } catch (error) {
    throw error; 
  }
});

test("Swap with long pending time", { timeout: 180000 }, async ({ wallet }) => { 
  console.log("Swap with long pending time");
  const swapPromise = validSwapPage.SwapWithLongPendingTime(wallet);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Test case timed out!")), 180000)
  );
  try {
    await Promise.race([swapPromise, timeoutPromise]);
  } catch (error) {
    throw error; 
  }
});

//ĐỢI FIX LỖI
// test("Swap with max value", { timeout: 180000 }, async ({ wallet }) => { 
//   console.log("Swap with max value");
//   const swapPromise = validSwapPage.SwapWithValueMax(wallet);
//   const timeoutPromise = new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("Test case timed out!")), 180000)
//   );
//   try {
//     await Promise.race([swapPromise, timeoutPromise]);
//   } catch (error) {
//     throw error; 
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
