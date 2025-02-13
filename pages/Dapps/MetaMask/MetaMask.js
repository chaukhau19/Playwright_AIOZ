import { FunctionPage } from "../../../pages/Swap/function.js";

export class ConnectWalletMetaMaskPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Connect_MetaMask(wallet) {
        await this.functionPage.gotoURL();
        await this.functionPage.Connect_Wallet_MetaMask();
        await wallet.approve();
        await this.functionPage.Verify_Account_MetaMask_Connected();
    }

    async Disconnect_MetaMask(wallet) {
        await this.functionPage.gotoURL();
        await this.functionPage.Connect_Wallet_MetaMask();
        await wallet.approve(); 
        await this.functionPage.Verify_Account_MetaMask_Connected();
        await this.functionPage.Disconnect_Wallet_MetaMask();
        await this.functionPage.Verify_Account_MetaMask_Disconnected();
    }

    async Switch_Network(wallet) {
        await this.functionPage.gotoURL();
        await this.functionPage.Connect_Wallet_MetaMask();
        await wallet.approve(); 
        await this.functionPage.Verify_Account_MetaMask_Connected();
        await this.Switch_Network_To_Ethereum();
        await this.Switch_Network_To_AIOZ();
    }

   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Switch_Network_To_Ethereum() {
        await this.page.getByTestId('chain-selector').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('Ethereum-selector').click();
        await this.page.waitForTimeout(1000);
    }

    async Switch_Network_To_AIOZ() {
        await this.page.getByTestId('chain-selector').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('AIOZ Testnet-selector').click();
        await this.page.waitForTimeout(1000);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
