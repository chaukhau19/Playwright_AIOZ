//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { config } from "./../../../data/Swap_Config.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Swap/Swap_Functions.js";
//Dedicated functions
import { ValidSwapPage} from "../../../pages/Swap/Valid_Swap/AIOZ_to_WAIOZ.js";

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

test("Swap with different input values", async ({ wallet }) => {
  console.log("Swap with different input values");
  await functionPage.TimeoutTest(async () => {
    for (const inputValue of config.InputValues) {
      await validSwapPage.SwapWithInputValue(wallet, inputValue);
      await page.waitForTimeout(3000);
      await page.reload();
    }
  });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








