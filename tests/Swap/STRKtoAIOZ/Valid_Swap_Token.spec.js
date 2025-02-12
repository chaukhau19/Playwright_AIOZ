import { test } from "../../Dapps/MetaMask/SetupMetaMask.js";
import { ValidSwapPage} from "../../../pages/Swap/STRKtoAIOZ/Valid_Swap.js";
import { FunctionPage } from "../../../pages/Swap/function.js";

test("Swap AIOZ to STRK", async ({ wallet, page }) => {
  const functionPage = new FunctionPage(page);
  const validSwapPage = new ValidSwapPage(page);
  try {
    await functionPage.gotoURL();

    await functionPage.Connect_Wallet_MetaMask();

    await wallet.approve(); 

    await functionPage.Verify_Account_Connected();

    await validSwapPage.Select_Token();

    await validSwapPage.Token_Redemption();

    await functionPage.Total_Token_Before();

    await validSwapPage.Fill_Amount_A('1');

    await functionPage.Token_Swap_Page();  

    await validSwapPage.Swap_Tokens();

    await functionPage.Token_Confirm_Swap_Page();
    
    await functionPage.Compare_On_Swap_And_Confirm_Swap_Page();

    await functionPage.Confirm_Swap();

    await wallet.confirmTransaction(); 
    
    await validSwapPage.Add_to_MetaMask();
    
    await validSwapPage.Close_Confirmation();

    await functionPage.Total_Token_After();

    await functionPage.Compare_Token_Before_And_After_Swap();

    await functionPage.Get_Token_All_Web();

  } catch (error) {
    throw error; 
  }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









