//Shared Functions
import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { ValidPositionPage } from "../../../pages/2_Position/01_Valid_Position/AIOZandSTRK.js";

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

//Error
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

//Error
test("Create position in range 1", async ({ wallet }) => { 
  console.log("Create position in range 1");
  await functionPage.TimeoutTest(validPositionPage.CreateInrange1.bind(validPositionPage), wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

