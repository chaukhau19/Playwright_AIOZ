import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { ValidSwapPage} from "../../../pages/Swap/Valid_Swap/AIOZ_to_USDT.js";


test("Swap AIOZ to USDT with value 1", async ({ page, wallet }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.Swapwithvalue1(wallet);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









