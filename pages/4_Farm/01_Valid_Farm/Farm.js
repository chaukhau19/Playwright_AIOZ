import { farmconfig } from "../../../data/Farm_Config.js";
import { FunctionPage } from "../../Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";
import { swapconfig } from "../../../data/Swap_Config.js";
import { positionconfig } from "../../../data/Position_Config.js";

export class ValidFarmPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Create_Incentive(wallet) {
        try {
            await this.functionPage.Farm_Page();
            await this.functionPage.Create_Incentive_Element();
            await this.functionPage.Rewards_Amount_InputText(farmconfig.InputValues_Rewards_Amount[0]);
            await this.functionPage.Pool_Pair_InputText(farmconfig.InputValues_Pool_Pair_USDTAIOZ[0]);
            await this.functionPage.selectDateTime(
                { days: 0, months: 0, years: 0 },  
                { days: 0, months: 0, years: 0 },  
                { hours: 0, minutes: 1 },        
                { hours: 0, minutes: 2 },        
                false
            );            
            await this.functionPage.Refundee_Address_InputText(farmconfig.InputValues_Refundee_Address[0]);
            await this.functionPage.Create_Incentive_Button();
            await this.functionPage.Confirm_Create_Incentive_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Farm_Page();
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Incentive_NotStarted(farmconfig.NotStarted_USDT_AIOZ_001_Element);
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Verify_Incentive_NotStarted_NotExist(farmconfig.NotStarted_USDT_AIOZ_001_Element);
            await this.functionPage.Verify_Incentive_OnGoing(farmconfig.Ongoing_USDT_AIOZ_001_Element);
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Verify_Incentive_OnGoing_NotExist(farmconfig.Ongoing_USDT_AIOZ_001_Element);
            await this.functionPage.Verify_Incentive_Ended(farmconfig.Ended_USDT_AIOZ_001_Element);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async CheckStatusIncentive(wallet) {
        try {
            await this.functionPage.Farm_Page();
            await this.functionPage.Create_Incentive_Element();
            await this.functionPage.Rewards_Amount_InputText(farmconfig.InputValues_Rewards_Amount[0]);
            await this.functionPage.Pool_Pair_InputText(farmconfig.InputValues_Pool_Pair_STRKAIOZ[0]);
            await this.functionPage.selectDateTime(
                { days: 0, months: 0, years: 0 },  
                { days: 0, months: 0, years: 0 },  
                { hours: 0, minutes: 1 },        
                { hours: 0, minutes: 2 },        
                false
            );            
            await this.functionPage.Refundee_Address_InputText(farmconfig.InputValues_Refundee_Address[0]);
            await this.functionPage.Create_Incentive_Button();
            await this.functionPage.Confirm_Create_Incentive_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Farm_Page();
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Incentive_NotStarted(farmconfig.NotStarted_STRK_AIOZ_001_Element);
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Verify_Incentive_NotStarted_NotExist(farmconfig.NotStarted_STRK_AIOZ_001_Element);
            await this.functionPage.Verify_Incentive_OnGoing(farmconfig.Ongoing_STRK_AIOZ_001_Element);
            await this.functionPage.waitForTimeout(60000);
            await this.functionPage.Verify_Incentive_OnGoing_NotExist(farmconfig.Ongoing_STRK_AIOZ_001_Element);
            await this.functionPage.Verify_Incentive_Ended(farmconfig.Ended_STRK_AIOZ_001_Element);

        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }

    async Stake_Token(wallet) {
        try {
            //Create Incentive
            await this.functionPage.Farm_Page();
            await this.functionPage.Create_Incentive_Element();
            await this.functionPage.Rewards_Amount_InputText(farmconfig.InputValues_Rewards_Amount[0]);
            await this.functionPage.Pool_Pair_InputText(farmconfig.InputValues_Pool_Pair_STRKAIOZ[1]);
            await this.functionPage.selectDateTime(
                { days: 0, months: 0, years: 0 },  
                { days: 0, months: 0, years: 0 },  
                { hours: 0, minutes: 1 },        
                { hours: 0, minutes: 15 },        
                false
            );            
            await this.functionPage.Refundee_Address_InputText(farmconfig.InputValues_Refundee_Address[0]);
            await this.functionPage.Create_Incentive_Button();
            await this.functionPage.Confirm_Create_Incentive_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Farm_Page();
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            await this.functionPage.waitForTimeout(60000);

            //Create Pool
            await this.functionPage.Pools_Page();
            await this.functionPage.New_Position_Button();
            await this.functionPage.Clear_All_Button();
            await this.functionPage.Pool_Select_Token_AIOZ_A();
            await this.functionPage.Pool_Select_Token_STRK_B();
            await this.functionPage.Fee_Tier_005_Element();
            await this.functionPage.Fill_Amount_A_on_Pool(positionconfig.InputValues_A[0]);
            await this.functionPage.Supply_Button();
            await this.functionPage.Confirm_Supply_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);

            //Stake Token
            await this.functionPage.Farm_Page();
            await this.functionPage.Incentive_AIOZSTRK_005_OnGoing_Element();
            await this.functionPage.Threedots_Icon();
            await this.functionPage.Stake_Token_Button();
            await this.functionPage.Approve_Button();
            await wallet.confirmTransaction();
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Stake_Token_Button();
            await this.functionPage.Confirm_Stake_Token_Button();
            await wallet.confirmTransaction();
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
            

            // //Verify Fee Token///
            // await this.functionPage.Farm_Page();
            // await this.functionPage.Incentive_AIOZSTRK_005_OnGoing_Element();
            // await this.functionPage.Threedots_Icon();

            //Swap Token
            await this.functionPage.Swaps_Page();
            await this.functionPage.Select_Token_USDC_B();
            await this.functionPage.Fill_Amount_A(swapconfig.InputValue_A_1);  
            await this.functionPage.Swap_Button();
            await this.functionPage.Confirm_Swap_Button();
            await wallet.confirmTransaction(); 
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);

            //Verify Fee Token///
            // await this.functionPage.Farm_Page();
            // await this.functionPage.Incentive_AIOZSTRK_005_OnGoing_Element();
            // await this.functionPage.Threedots_Icon();

            //Unstake Token
            await this.functionPage.Farm_Page();
            await this.functionPage.Incentive_AIOZSTRK_005_OnGoing_Element();
            await this.functionPage.Threedots_Icon();
            await this.functionPage.Unstake_Button();
            await this.functionPage.Confirm_Unstake_Button();
            await wallet.confirmTransaction();
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);

            //Collect Fee Token
            await this.functionPage.Farm_Page();
            await this.functionPage.Incentive_AIOZSTRK_005_OnGoing_Element();
            await this.functionPage.Threedots_Icon();
            await this.functionPage.Collect_Fees_Button();
            await this.functionPage.Confirm_Collect_Fees_Button();
            await wallet.confirmTransaction();
            await this.functionPage.Close_Confirmation_Submitted_Icon();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);

            //Close Pool
            await this.functionPage.Pools_Page();
            await this.functionPage.Hide_Closed_Positions_Button();
            await this.functionPage.Verify_AIOZ_STRK_InRange_005();
            await this.functionPage.AIOZ_STRK_InRange_005_Element();
            await this.functionPage.Remove_Liquidity_Button();
            await this.functionPage.Amount_Max_A();
            await this.functionPage.Collect_Liquidity_Button();
            await this.functionPage.Remove_Button();
            await this.functionPage.Confirm_Remove_Button();
            await wallet.confirmTransaction();  
            await this.functionPage.Close_Transaction_Submitted_Button();
            await this.functionPage.Verify_Transaction_Pending(farmconfig.Transaction_Pending_Element);
            await this.functionPage.Verify_Transaction_Pending_NotExist(farmconfig.Transaction_Pending_Element);
        } catch (error) {
            console.error("Test failed:", error.message);
            throw error;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}