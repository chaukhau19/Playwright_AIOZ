import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { InvalidSwapPage } from "../../../pages/Swap/Invalid_Swap/AIOZ_to_STRK.js";

test("Swap AIOZ to STRK with zero value", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithValue0(wallet);
});

test("Swap AIOZ to STRK Rejected", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithCancelSwap(wallet);
});

test("Insufficient AIOZ balance", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithInsufficient(wallet);
});

test("Swap AIOZ to STRK when contract approval is missing", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithoutApproval(wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ERROR
test("Swap AIOZ to STRK with expired transaction", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithExpiredTransaction(wallet);
});
//ERROR
test("Swap AIOZ to STRK with slippage too low", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithLowSlippage(wallet);
});
//ERROR
test("Swap AIOZ to STRK with slippage too high", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithHighSlippage(wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Swap AIOZ to STRK when wallet is disconnected", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithDisconnectedWallet(wallet);
});


test("Swap AIOZ to STRK without enough gas fee", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithoutEnoughGasFee(wallet);
});

test("Swap AIOZ to STRK fails due to slippage tolerance exceeded", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithSlippageToleranceExceeded(wallet);
});

test("Swap AIOZ to STRK fails due to price impact exceeded", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithPriceImpactExceeded(wallet);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Swap AIOZ to STRK with max amount", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithMinAndMaxAmount(wallet);
});

test("Swap AIOZ to STRK with large amount affecting exchange rate", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithLargeAmountRateChange(wallet);
});


test("Swap AIOZ to STRK but do not sign transaction in wallet", async ({ page, wallet }) => {
  const invalidSwapPage = new InvalidSwapPage(page);
  await invalidSwapPage.SwapWithoutTransactionSignature(wallet);
});




