import { FunctionPage } from "../../../pages/Swap/function.js";
import { config } from "./../../../data/AIOZ_config.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    async saveCookies() {
        try {
            const dir = path.join(__dirname, './../../../cookies');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const cookies = await this.page.context().cookies();
            const filePath = path.join(dir, 'cookies_aioz.json');
            fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
            console.log(`Cookies saved to ${filePath}`);
        } catch (error) {
            console.error("Error saving cookies:", error);
        }
    }
    
    async useCookies() {
        try {
            const cookiesPath = path.resolve(__dirname, './../../../cookies/cookies_aioz.json');
            console.log(`Attempting to read cookies from ${cookiesPath}`);
            const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
            await this.page.context().addCookies(cookies);
            await this.page.goto(config.URL);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error("Error using cookies:", error);
        }
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
