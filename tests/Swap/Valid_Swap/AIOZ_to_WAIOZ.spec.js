import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { ValidSwapPage} from "../../../pages/Swap/Valid_Swap/AIOZ_to_WAIOZ.js";


test("Swap AIOZ to WAIOZ with one value", async ({ page, wallet }) => {
  const validSwapPage = new ValidSwapPage(page);
  await validSwapPage.SwapWithValue1(wallet);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









