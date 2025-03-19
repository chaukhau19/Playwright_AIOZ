//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { ValidPositionPage } from "../../../pages/2_Position/01_Valid_Position/AIOZandUSDT.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let functionPage; 
let validPositionPage;

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  validPositionPage = new ValidPositionPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Create position in range 0.01", async ({ wallet }) => { 
  console.log("Create position in range 0.01");
  await functionPage.TimeoutTest(validPositionPage.CreateInrange001.bind(validPositionPage), wallet);
});

test("Create position in range 0.05", async ({ wallet }) => { 
  console.log("Create position in range 0.05");
  await functionPage.TimeoutTest(validPositionPage.CreateInrange005.bind(validPositionPage), wallet);
});

test("Create position in range 0.3", async ({ wallet }) => { 
  console.log("Create position in range 0.3");
  await functionPage.TimeoutTest(validPositionPage.CreateInrange03.bind(validPositionPage), wallet);
});

test("Create position in range 1", async ({ wallet }) => { 
  console.log("Create position in range 1");
  await functionPage.TimeoutTest(validPositionPage.CreateInrange1.bind(validPositionPage), wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Create position out of range Current < Low Price < High Price", async ({ wallet }) => { 
  console.log("Create position out of range Current < Low Price < High Price");
  await functionPage.TimeoutTest(validPositionPage.CreateOutOfRange_LowHigh.bind(validPositionPage), wallet);
});

test("Create position out of range Current > Low Price > High Price", async ({ wallet }) => { 
  console.log("Create position out of range Current > Low Price > High Price");
  // await functionPage.TimeoutTest(validPositionPage.CreateOutOfRange_HighLow.bind(validPositionPage), wallet);
});

test("Create position in full range", async ({ wallet }) => { 
  console.log("Create position in full range");
  await functionPage.TimeoutTest(validPositionPage.CreateFullRange.bind(validPositionPage), wallet);
});

test("Create position in small range", async ({ wallet }) => { 
  console.log("Create position in small range");
  await functionPage.TimeoutTest(validPositionPage.CreateSmallRange.bind(validPositionPage), wallet);
});

test("Increase liquidity for Closed position", async ({ wallet }) => { 
  console.log("Increase liquidity for Closed position");
  await functionPage.TimeoutTest(validPositionPage.IncreaseLiquidityForInRange.bind(validPositionPage), wallet);
});

test("Create position Inrange and collect fee Swap", async ({ wallet }) => { 
  console.log("Create position Inrange and collect fee Swap");
  await functionPage.TimeoutTest(validPositionPage.Collect_Fee_Swap_Inrange.bind(validPositionPage), wallet);
});

test("Create position OutOfRange and No fee Swap", async ({ wallet }) => { 
  console.log("Create position OutOfRange and No fee Swap");
  await functionPage.TimeoutTest(validPositionPage.Collect_Fee_Swap_Outrange.bind(validPositionPage), wallet);
});





