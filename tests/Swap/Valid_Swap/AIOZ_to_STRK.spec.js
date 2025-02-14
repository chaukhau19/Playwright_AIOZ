import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { ValidSwapPage } from "../../../pages/Swap/Valid_Swap/AIOZ_to_STRK.js";


test("Swap AIOZ to STRK with one value", async ({ page, wallet }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithValue1(wallet);
});


test("Swap AIOZ to STRK with half value", async ({ wallet, page }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithValueHalf(wallet);
});


test("Swap AIOZ to STRK with max value", async ({ wallet, page }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithValueMax(wallet);
});

test("Swap AIOZ to STRK while network is down", async ({ wallet, page }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithNetworkIssue(wallet);
});

//ERROR
test("Swap AIOZ to STRK with long pending time", async ({ wallet, page }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithLongPendingTime(wallet);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









