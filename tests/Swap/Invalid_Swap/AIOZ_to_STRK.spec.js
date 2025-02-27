//Shared Functions
import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../../pages/Functions.js";
//Dedicated functions
import { InvalidSwapPage } from "../../../pages/Swap/Invalid_Swap/AIOZ_to_STRK.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let connectWalletMetaMaskPage;
let functionPage; 
let invalidSwapPage;

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000)) 
  ]);
});

test.beforeEach(async ({ page }) => {
  invalidSwapPage = new InvalidSwapPage(page);
  functionPage = new FunctionPage(page);
  await functionPage.gotoURL();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.close();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// test("Swap with zero value", async ({ wallet }) => {  
//   console.log("Swap with zero value");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithZeroValue.bind(invalidSwapPage), wallet);
// });

// test("Swap with insufficient balance", async ({ wallet }) => {  
//   console.log("Swap with insufficient balance");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithInsufficient.bind(invalidSwapPage), wallet);
// });

test("Swap rejected on MetaMask", async ({ wallet }) => {  
  console.log("Swap rejected on MetaMask");
  await functionPage.TimeoutTest(invalidSwapPage.SwapWithCancelSwap.bind(invalidSwapPage), wallet);
});

// test("Swap without contract approval", async ({ wallet }) => {  
//   console.log("Swap without contract approval");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithoutApproval.bind(invalidSwapPage), wallet);
// });

// test("Swap with disconnected wallet", async ({ wallet }) => {  
//   console.log("Swap with disconnected wallet");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithDisconnectedWallet.bind(invalidSwapPage), wallet);
// });

// test("Swap with high slippage tolerance", { timeout: 180000 }, async ({ wallet }) => {
//   console.log("Swap with high slippage tolerance");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithSlippageToleranceExceeded.bind(invalidSwapPage), wallet);
// });

test("Swap with price impact exceeding tolerance", async ({ wallet }) => {  
  console.log("Swap with price impact exceeding tolerance");
  await functionPage.TimeoutTest(invalidSwapPage.SwapWithPriceImpactExceeded.bind(invalidSwapPage), wallet);
});

// test("Swap with large amount affecting exchange rate", async ({ wallet }) => {  
//   console.log("Swap with large amount affecting exchange rate");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithLargeAmountRateChange.bind(invalidSwapPage), wallet);
// });

// test("Swap ETH to BTC on ETH network", async ({ wallet }) => {  
//   console.log("Swap ETH to BTC on ETH network");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapETHtoBTCOnETHNetwork.bind(invalidSwapPage), wallet);
// });

// test("Swap with incorrect network selected", async ({ wallet }) => {  
//   console.log("Swap with incorrect network selected");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithIncorrectNetwork.bind(invalidSwapPage), wallet);
// });

// test("Swap with an invalid receiving token address", async ({ wallet }) => {  
//   console.log("Swap with an invalid receiving token address");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithInvalidReceivingToken.bind(invalidSwapPage), wallet);
// });

// test("Swap Token Pairs with No Liquidity", async ({ wallet }) => {  
//   console.log("Swap Token Pairs with No Liquidity");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithNoLiquidity.bind(invalidSwapPage), wallet);
// });

// test("Swap with a revoked token spending approval", async ({ wallet }) => {  
//   console.log("Swap with a revoked token spending approval");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithRevokedApproval.bind(invalidSwapPage), wallet);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //ERROR Expired Confirm BTN
// test("Swap with expired transaction", async ({ wallet }) => {  
//   console.log("Swap with expired transaction");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithExpiredTransaction.bind(invalidSwapPage), wallet);
// });

// //BUG
// test("Swap with slippage too low", async ({ wallet }) => {  
//   console.log("Swap with slippage too low");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithLowSlippage.bind(invalidSwapPage), wallet);
// });

// //BUG
// test("Swap with slippage too high", async ({ wallet }) => {  
//   console.log("Swap with slippage too high");
//   await functionPage.TimeoutTest(invalidSwapPage.SwapWithHighSlippage.bind(invalidSwapPage), wallet);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
