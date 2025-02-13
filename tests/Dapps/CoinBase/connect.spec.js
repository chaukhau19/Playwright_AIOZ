import { test } from "./../../../pages/Dapps/SetupCoinBase.js";
import { ConnectWalletCoinBasePage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

test("Connect AIOZ with CoinBase", async ({ wallet, page }) => {
  const connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  await connectWalletCoinBasePage.Connect_CoinBase(wallet);
});
