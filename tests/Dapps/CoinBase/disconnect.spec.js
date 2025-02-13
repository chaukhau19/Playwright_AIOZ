import { test } from "./../../../pages/Dapps/SetupCoinBase.js";
import { ConnectWalletPage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

test("Disconnect AIOZ with CoinBase", async ({ wallet, page }) => {
  const connectWalletPage = new ConnectWalletPage(page);
  await connectWalletPage.Disconnect_CoinBase(wallet);
});
