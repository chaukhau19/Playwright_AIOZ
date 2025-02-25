//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { config } from "./../../../data/Swap_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Swap/Swap_Functions.js";
//Dedicated functions
import { ValidSwapPage} from "../../../pages/Swap/Valid_Swap/WAIOZ_to_AIOZ.js";

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


test("Swap with one value", async ({ wallet }) => {
  console.log("Swap with one value");
  await functionPage.TimeoutTest(async () => {
    for (const inputValue of config.InputValue_A_1) {
      await validSwapPage.SwapWithOneValue(wallet, inputValue);
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////         Nháp          //////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test("Swap with different input values", { timeout: 180000 }, async ({ page, wallet }) => {
//   const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
//   const validSwapPage = new ValidSwapPage(page);

//   await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
//   for (const inputValue of config.InputValues) {
//     try {
//       await validSwapPage.SwapWithInputValue(wallet, inputValue);
//       await page.waitForTimeout(3000);
//       await page.reload();
//       console.log(`✅ Completed test for input: ${inputValue}`);
//     } catch (error) {
//       console.error(`❌ Test failed with input value ${inputValue}:`, error);
//     }
//   }
// });


// test("Swap WAIOZ to AIOZ with one value", { timeout: 180000 }, async ({ page, wallet }) => {
//   const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
//   const validSwapPage = new ValidSwapPage(page);

//   await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
//   await validSwapPage.SwapWithValue1(wallet);
// });





