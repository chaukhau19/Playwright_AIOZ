import { positionconfig } from "../../../data/Position_Config.js";
import { ConnectWalletMetaMaskPage } from "../../6_Dapps/02_MetaMask/MetaMask.js";
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
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Total_Token_Before();   
            await this.functionPage.Price_Liquidity();
            await this.functionPage.Price_Range(positionconfig.FeeTier[0]);    
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();     
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001();
            await this.functionPage.AIOZ_USDT_InRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001_Not_Exist();

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
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_005_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Total_Token_Before();         
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[1]); 
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_005_Element();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_005();
            await this.functionPage.AIOZ_USDT_InRange_005_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_005_Not_Exist();


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
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_03_Element();
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
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_03_Element();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_03();
            await this.functionPage.AIOZ_USDT_InRange_03_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_03_Not_Exist();

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
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_1_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);    
            await this.functionPage.Total_Token_Before(); 
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[3]);    
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_1_Element();
            await this.functionPage.Total_Token_After();
            await this.functionPage.Compare_Token_Before_And_After_Valid_Position();
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_1();
            await this.functionPage.AIOZ_USDT_InRange_1_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_1_Not_Exist();


        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateOutOfRange_LowHigh(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Current_Price_Is_Smaller_Than_Low_And_High();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_OutRange_001();
            await this.functionPage.AIOZ_USDT_OutRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_OutRange_001_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateOutOfRange_HighLow(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Current_Price_Is_Greater_Than_Low_And_High();
            await this.functionPage.Fill_Amount_B_on_Pool(positionconfig.InputValues_B[0]);  
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_OutRange_001();
            await this.functionPage.AIOZ_USDT_OutRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_OutRange_001_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateFullRange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Full_Range_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001();
            await this.functionPage.AIOZ_USDT_InRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CreateSmallRange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_001_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Increment_Low_Element();
            await this.functionPage.Decrement_High_Element();
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001();
            await this.functionPage.AIOZ_USDT_InRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async IncreaseLiquidityForInRange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.Show_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_USDT_Closed_001();
            await this.functionPage.AIOZ_USDT_Closed_001_Element();
            await this.functionPage.Increase_Liquidity_Button();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);  
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button(); 
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001();
            await this.functionPage.AIOZ_USDT_InRange_001_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_001_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async Collect_Fee_Swap_Inrange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_005_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);     
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[1]); 
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Verify_AIOZ_USDT_InRange_005();
            await this.functionPage.AIOZ_USDT_InRange_005_Element();
            await this.functionPage.Verify_Collected_Fees_Not_Exist();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Fill_Amount_A(positionconfig.InputValues_A[0]); 
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.waitForTimeout(5000);
            await this.functionPage.Pools_Page();
            await this.functionPage.Verify_AIOZ_USDT_InRange_005();
            await this.functionPage.AIOZ_USDT_InRange_005_Element();
            await this.functionPage.Verify_Collected_Fees();
            await this.functionPage.Collected_Fees_Element();
            await this.functionPage.Collect_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.waitForTimeout(5000);
            await this.functionPage.Verify_Collected_Fees_Not_Exist();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.waitForTimeout(10000);
            await this.functionPage.Verify_AIOZ_USDT_InRange_005_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async Collect_Fee_Swap_Outrange(wallet) {
        try {
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_USDT_B();
            await this.functionPage.Fee_Tier_005_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);     
            await this.functionPage.Price_Liquidity();   
            await this.functionPage.Price_Range(positionconfig.FeeTier[1]); 
            await this.functionPage.Current_Price_Is_Smaller_Than_Low_And_High();
            await this.functionPage.Current_Price_Element();
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.AIOZ_USDT_OutRange_005_Element();
            await this.functionPage.Verify_Collected_Fees_Not_Exist();
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDT_B();
            await this.functionPage.Fill_Amount_A(positionconfig.InputValues_A[0]); 
            await this.functionPage.Swap_Page();  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Page();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.waitForTimeout(5000);
            await this.functionPage.Pools_Page();
            await this.functionPage.AIOZ_USDT_OutRange_005_Element();
            await this.functionPage.Verify_Collected_Fees_Not_Exist();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            // await this.functionPage.Verify_Remove_Liquidity();
            await this.functionPage.Pools_Page();
            await this.functionPage.waitForTimeout(10000);
            await this.functionPage.Verify_AIOZ_USDT_InRange_005_Not_Exist();

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}