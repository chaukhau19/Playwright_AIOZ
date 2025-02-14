import { config } from "./../../../data/AIOZ_config.js";
import { FunctionPage } from "../../../pages/Swap/function.js";

export class InvalidSwapPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async SwapWithValue0(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_0);
            await this.functionPage.Expect_Value_Invalid();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithCancelSwap(wallet) {
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
            await wallet.reject();
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithInsufficient(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_Insufficient);
            await this.functionPage.Expect_Value_Invalid();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
    async SwapWithExpiredTransaction(wallet) {
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
            await this.functionPage.Confirm_Swap();
            await this.functionPage.waitForTimeout(65000);
            await wallet.confirmTransaction();           
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    

    async SwapWithDisconnectedWallet(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Disconnect_Wallet_MetaMask();
            await this.functionPage.Verify_Account_MetaMask_Disconnected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Choose_Wallet_To_Connect_Page();   
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithLowSlippage(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_0Percent();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
            await this.functionPage.Get_Token_All_Web();  
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithHighSlippage(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_100Percent();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
            await this.functionPage.Get_Token_All_Web();  
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithoutEnoughGasFee(wallet) {
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
    
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithSlippageToleranceExceeded(wallet) {
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
    
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async SwapWithPriceImpactExceeded(wallet) {
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
    
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
    

    async SwapWithoutApproval(wallet) {
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
            await this.functionPage.Close_Confirmation();
            await this.functionPage.waitForTimeout(20000);
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}