import { test } from "./../../../pages/Dapps/SetupCoinBase.js";
import { ConnectWalletPage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

test("Switch Network Ethereum and AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  const connectWalletPage = new ConnectWalletPage(page);
  await connectWalletPage.Switch_Network(wallet);
});

