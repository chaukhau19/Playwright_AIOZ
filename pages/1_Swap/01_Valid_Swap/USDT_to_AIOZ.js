import { swapconfig } from "./../../../data/Swap_Config.js";
import { farmconfig } from "../../../data/Farm_Config.js";
import { FunctionPage } from "../../../pages/Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

export class ValidSwapPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async SwapWithInputValue(wallet, inputValue) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(inputValue);  
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Add_WAIOZ_to_MetaMask();       
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);
            
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async SwapWithValueHalf(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Amount_Half_A();
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Add_WAIOZ_to_MetaMask();       
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);
        
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithNetworkIssue(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await this.functionPage.Off_Network();  
            await wallet.confirmTransaction();    
            await this.functionPage.Add_WAIOZ_to_MetaMask();       
            await this.functionPage.On_Network();  
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithValueMax(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Add_WAIOZ_to_MetaMask();       
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Max_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithLongPendingTime(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_1M();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction();    
            await this.functionPage.Add_WAIOZ_to_MetaMask();       
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }
    
    async BackTokenHalf(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Amount_Half_A();
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction();      
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async BackTokenMax(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction();      
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Max_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}