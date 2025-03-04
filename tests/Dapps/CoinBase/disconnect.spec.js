import { test } from "./../../../pages/Dapps/SetupCoinBase.js";
import { ConnectWalletCoinBasePage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

test("Disconnect AIOZ with CoinBase", { timeout: 200000 }, async ({ wallet, page }) => {
  const connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  await connectWalletCoinBasePage.Disconnect_CoinBase(wallet);
});
