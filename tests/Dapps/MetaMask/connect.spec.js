import { test } from "./SetupMetaMask.js";
import { ConnectWalletPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Connect AIOZ with MetaMask", async ({ wallet, page }) => {

  const connectWalletPage = new ConnectWalletPage(page);

  await connectWalletPage.gotoURL();

  await connectWalletPage.Connect_Wallet();


  // await wallet.confirmTransaction();
  await wallet.approve();


  await connectWalletPage.Verify_Account_Connected();

});
