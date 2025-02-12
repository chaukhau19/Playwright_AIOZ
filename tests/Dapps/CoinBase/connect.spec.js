import { ConnectWalletPage } from "../../../pages/Dapps/CoinBase/CoinBase.js";
import { test } from "./SetupCoinBase.js";

test("Connect AIOZ with CoinBase", async ({ wallet, page }) => {
  const connectWalletPage = new ConnectWalletPage(page);

  await connectWalletPage.gotoURL();

  await connectWalletPage.Connect_Wallet();

  await wallet.approve(); 

  await connectWalletPage.Verify_Account_Connected();
});

