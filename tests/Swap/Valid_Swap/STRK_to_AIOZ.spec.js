//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { config } from "./../../../data/Swap_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Swap/Swap_Functions.js";
//Dedicated functions
import { ValidSwapPage} from "../../../pages/Swap/Valid_Swap/STRK_to_AIOZ.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let validSwapPage;
let functionPage; 

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
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
    const swapPromise = validSwapPage.SwapWithInputValue(wallet, inputValue);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Test case timed out!")), 500000) 
    );
    try {
      await Promise.race([swapPromise, timeoutPromise]); 
      await page.waitForTimeout(3000);
      await page.reload();
    } catch (error) {
      throw error;
    }
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









