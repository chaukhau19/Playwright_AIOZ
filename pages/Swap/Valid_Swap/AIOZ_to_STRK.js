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

    async Swapwithvalue1(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            // await this.Select_Token();
            // await this.functionPage.Total_Token_Before();
            // await this.functionPage.Fill_Amount_A(config.InputValue_A);
            // await this.functionPage.Token_Swap_Page();  
            // await this.functionPage.Swap_Tokens();
            // await this.functionPage.Token_Confirm_Swap_Page();
            // await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            // await this.functionPage.Confirm_Swap();
            // await wallet.confirmTransaction(); 
            // await this.Close_Confirmation();
            // await this.functionPage.Total_Token_After();
            // await this.functionPage.Compare_Token_Before_And_After_Swap();
            // await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }

    async Swapwithvaluehalf(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            // await this.Select_Token();
            // await this.functionPage.Total_Token_Before();
            // await this.functionPage.Fill_Amount_Half_A();
            // await this.functionPage.Token_Swap_Page();  
            // await this.functionPage.Swap_Tokens();
            // await this.functionPage.Token_Confirm_Swap_Page();
            // await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            // await this.functionPage.Confirm_Swap();
            // await wallet.confirmTransaction(); 
            // await this.Close_Confirmation();
            // await this.functionPage.Total_Token_After();
            // await this.functionPage.Compare_Token_Before_And_After_Swap();
            // await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
    async Swapwithvaluemax(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_MetaMask_Connected();
            await this.Select_Token();
            await this.functionPage.Total_Token_Before();
            await this.functionPage.Fill_Amount_Max_A();
            await this.functionPage.Token_Swap_Page();  
            await this.functionPage.Swap_Tokens();
            await this.functionPage.Token_Confirm_Swap_Page();
            await this.functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap();
            await wallet.confirmTransaction(); 
            await this.Close_Confirmation();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Swap();
            await this.functionPage.Get_Token_All_Web();
        } catch (error) {
            console.error("Swap failed:", error);
            throw error; 
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Select_Token() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText(config.Select_STRK_Token).click();
        await this.page.getByRole('button', { name: 'I understand' }).click();
    }

    async Close_Confirmation() {
        await this.page.waitForTimeout(5000);
        await this.page.getByTestId('confirmation-close-icon').click();
        await this.page.waitForTimeout(5000);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}