import { swapconfig } from "./../../../data/Swap_Config.js";
import { farmconfig } from "../../../data/Farm_Config.js";
import { FunctionPage } from "../../../pages/Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
export class InvalidSwapPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async SwapWithZeroValue(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_0);
            await this.functionPage.Verify_Enter_An_Amount();
            
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithInsufficient(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_Insufficient);
            await this.functionPage.Verify_Enter_An_Amount();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithCancelSwap(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.reject();
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithoutApproval(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();           
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.waitForTimeout(20000);
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithDisconnectedWallet(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Disconnect_Wallet_MetaMask();
            await this.functionPage.Verify_Account_MetaMask_Disconnected();
            await this.functionPage.Close_Choose_Wallet_Button();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Connect_Wallet_Button();
            await this.functionPage.Verify_Select_Wallet_To_Connect();   

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithSlippageToleranceExceeded(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Transaction_Deadline_100Percent();
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
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
            // await this.functionPage.Get_Token_All_Web();
    
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithPriceImpactExceeded(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Transaction_Deadline_0Percent();
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
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();
    
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithLargeAmountRateChange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_high);
            await this.functionPage.Verify_Price_Impact_Warning();
            await this.functionPage.Verify_Insufficient_AIOZ_Balance();
    
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapETHtoBTCOnETHNetwork(wallet) {
        try {
            await this.functionPage.Switch_Network_To_Ethereum();
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_BTC_B();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Verify_Price_Impact_Warning();
            await this.functionPage.Verify_Insufficient_ETH_Balance();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithIncorrectNetwork(wallet) {
        try {
            await this.functionPage.Switch_Network_To_Ethereum();
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Search_Token_WAIOZ_B_Invalid();
            await this.functionPage.Verify_UNKNOWN_Token();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Verify_Insufficient_Liquidity_For_This_Trade();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithInvalidReceivingToken(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Search_Adress_Token_B_Invalid();
            await this.functionPage.Verify_No_Results_Found();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithNoLiquidity(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Search_Token_UNI_B();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Verify_Insufficient_Liquidity_For_This_Trade();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async SwapWithExpiredTransaction(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_1M();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await this.functionPage.waitForTimeout(65000);
            await wallet.confirmTransaction();           
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithLowSlippage(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_0Percent();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
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
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

    async SwapWithHighSlippage(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Transaction_Deadline_100Percent();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);
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
            await this.functionPage.Compare_Token_Before_And_After_Invalid_Swap();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}