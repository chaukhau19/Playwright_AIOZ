import { FunctionPage } from "../../Functions.js";

export class ConnectWalletCoinBasePage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Connect_CoinBase(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_CoinBase();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_CoinBase_Connected();

        } catch (error) {
            console.error(" Error during CoinBase connection:", error);
            throw error;
        } finally {
            await this.page.close();
        }
    }

    async Disconnect_CoinBase(wallet) {
        try {
            await this.functionPage.gotoURL();
            // await this.functionPage.Connect_Wallet_CoinBase();
            // await wallet.approve(); 
            // await this.functionPage.Verify_Account_CoinBase_Connected();
            await this.functionPage.Disconnect_Wallet_CoinBase();
            await this.functionPage.Verify_Account_CoinBase_Disconnected();

        } catch (error) {
            console.error(" Error during CoinBase disconnection:", error);
            throw error;
        } finally {
            await this.page.close();
        }
    }

    async Switch_Network(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_CoinBase();
            await wallet.approve(); 
            await this.functionPage.Verify_Account_CoinBase_Connected();
            await this.functionPage.Switch_Network_To_AIOZ();
            await wallet.approve();
            await this.functionPage.Switch_Network_To_Ethereum();

        } catch (error) {
            console.error(" Error during Switch Network:", error);
            throw error;
        } finally {
            await this.page.close();
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
    