import { ConnectWalletPage } from "../../../pages/Dapps/CoinBase/CoinBase.js";

import { test } from "./SetupCoinBase.js";


test("Switch Network Ethereum to AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  const connectWalletPage = new ConnectWalletPage(page);

  await connectWalletPage.gotoURL();

  await connectWalletPage.Connect_Wallet();

  await wallet.approve(); 

  await connectWalletPage.Verify_Account_Connected();

  await connectWalletPage.Switch_Network_To_Ethereum();
  
  await connectWalletPage.Switch_Network_To_AIOZ();
});

