import { config } from "./../../../data/Swap_Config.js";
import { FunctionPage } from "../../../pages/Swap/Swap_Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

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
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(inputValue);  
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.Add_to_MetaMask();
            await this.functionPage.Close_Confirmation_Button();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async SwapWithValue1(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_STRK_B();
            await this.functionPage.Token_Redemption_Button();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_A(config.InputValue_A_1);
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Compare_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.Add_to_MetaMask();
            await this.functionPage.Close_Confirmation_Button();
            await this.functionPage.Total_Token_After();
            await this.page.reload();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Swap(0.01);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error; 
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    async Add_to_MetaMask() {
        await this.page.waitForTimeout(10000);
        await this.page.getByRole('button', { name: 'Add WAIOZ to MetaMask' }).click();
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}