import { assetsconfig } from "../../../data/Assets_Config.js";
import { FunctionPage } from "../../Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

export class ValidAssetsPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Display_Liquidity(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDC_B();
            await this.functionPage.Fee_Tier_03_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(assetsconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();
            await this.functionPage.Price_Range(assetsconfig.FeeTier[2]);    
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();    
            await this.functionPage.Hide_Closed_Positions_Button(); 
            await this.functionPage.Verify_AIOZ_USDC_InRange_03();
            await this.functionPage.Assets_Page();
            await this.functionPage.Assets_Liquidity_Element();
            await this.functionPage.Verify_AIOZ_USDC_Assets_03();
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.AIOZ_USDC_InRange_03_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Verify_AIOZ_USDC_InRange_03_Not_Exist();
            await this.functionPage.Assets_Page();
            await this.functionPage.Assets_Liquidity_Element();
            await this.functionPage.Verify_AIOZ_USDC_Assets_03_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}