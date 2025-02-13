import { test } from "./../../../pages/Dapps/SetupCoinBase.js";
import { ConnectWalletCoinBasePage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

test("Switch Network Ethereum and AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  const connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  await connectWalletCoinBasePage.Switch_Network(wallet);
});

