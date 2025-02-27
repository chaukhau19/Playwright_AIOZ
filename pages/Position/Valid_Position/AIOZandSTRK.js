import { positionconfig } from "../../../data/Position_Config.js";
import { ConnectWalletMetaMaskPage } from "../../Dapps/MetaMask/MetaMask.js";
import { FunctionPage } from "../../Functions.js";

export class ValidPositionPage {
    constructor(page) {
        this.page = page;
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
        this.functionPage = new FunctionPage(page);
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async CreateInrange001(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_001();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();
            await this.functionPage.Price_Range(positionconfig.FeeTier[0]);    
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();     
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_001();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateInrange005(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_005();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);        
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[1]); 
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_005();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();


        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateInrange03(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_03();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);    
            await this.functionPage.Total_Token_Before(); 
            await this.functionPage.Price_Liquidity(); 
            await this.functionPage.Price_Range(positionconfig.FeeTier[2]); 
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_03();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateInrange1(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_1();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);    
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[3]);    
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_1();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();


        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}