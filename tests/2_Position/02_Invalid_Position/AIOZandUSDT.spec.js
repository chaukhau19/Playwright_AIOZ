//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { InvalidPositionPage } from "../../../pages/2_Position/02_Invalid_Position/AIOZandUSDT.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let functionPage; 
let invalidPositionPage;

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  invalidPositionPage = new InvalidPositionPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("No Liquidity Data", async ({ wallet }) => { 
  console.log("No Liquidity Data");
  await functionPage.TimeoutTest(invalidPositionPage.NoLiquidityData.bind(invalidPositionPage), wallet);
});

test("Insufficient balance", async ({ wallet }) => { 
  console.log("Insufficient balance");
  await functionPage.TimeoutTest(invalidPositionPage.InsufficientBalance.bind(invalidPositionPage), wallet);
});

test("Appear Here", async ({ wallet }) => { 
  console.log("Appear Here");
  await functionPage.TimeoutTest(invalidPositionPage.AppearHere.bind(invalidPositionPage), wallet);
});

test("The pool has not been initialized", async ({ wallet }) => { 
  console.log("The pool has not been initialized");
  await functionPage.TimeoutTest(invalidPositionPage.NotBeenInitialized.bind(invalidPositionPage), wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Zero liquidity provided", async ({ wallet }) => { 
});

test("Insufficient token A balance", async ({ wallet }) => { 
});

test("Insufficient token B balance", async ({ wallet }) => { 
});

test("Create position with unsupported token pair", async ({ wallet }) => { 
});

test("Create position with expired price data", async ({ wallet }) => { 
});

test("Create position without approval", async ({ wallet }) => { 
});

test("Collect fees for expired position", async ({ wallet }) => {
});
