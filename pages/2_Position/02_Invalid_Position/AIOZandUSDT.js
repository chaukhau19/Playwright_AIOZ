import { positionconfig } from "../../../data/Position_Config.js";
import { farmconfig } from "../../../data/Farm_Config.js";
import { ConnectWalletMetaMaskPage } from "../../6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../Functions.js";

export class InvalidPositionPage {
    constructor(page) {
        this.page = page;
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
        this.functionPage = new FunctionPage(page);
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async NoLiquidityData(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();         
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDC_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Verify_No_Liquidity_Data();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async InsufficientBalance(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();         
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDC_B();
            await this.functionPage.Fee_Tier_03_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[11]);
            await this.functionPage.Verify_Insufficient_USDC_Balance();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async AppearHere(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();         
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Verify_Appear_Here();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async NotBeenInitialized(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();         
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_1_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Verify_Not_Initialized();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

