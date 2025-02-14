import { config } from "./../../../data/AIOZ_config.js";
import { FunctionPage } from "../../../pages/Swap/function.js";

export class ValidSwapPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async SwapWithValue1(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithValueHalf(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_Half_A();
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
    async SwapWithValueMax(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_Max_A();
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithLongPendingTime(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_1M();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction();           
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
    async SwapWithNetworkIssue(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await this.functionPage.Off_Network();  
            await wallet.confirmTransaction();    
            await this.functionPage.waitForTimeout(5000); 
            await this.functionPage.On_Network();  
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}