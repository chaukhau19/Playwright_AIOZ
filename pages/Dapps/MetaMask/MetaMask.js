import { FunctionPage } from "../../../pages/Functions.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ConnectWalletMetaMaskPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.dir = path.join(__dirname, './../../../cookies');
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Connect_MetaMask(wallet) {
        try {
            await this.functionPage.gotoURL();
            await this.functionPage.Connect_Wallet_MetaMask();
            await wallet.approve();
            await this.functionPage.Verify_Account_MetaMask_Connected();
        } catch (error) {
            console.error("❌ Error during MetaMask connection:", error);
        } finally {
            await this.page.close();
        }
    }

    async Disconnect_MetaMask(wallet) {
        await this.functionPage.gotoURL();
        await this.functionPage.Connect_Wallet_MetaMask();
        await wallet.approve(); 
        await this.functionPage.Verify_Account_MetaMask_Connected();
        await this.functionPage.Disconnect_Wallet_MetaMask();
        await this.functionPage.Verify_Account_MetaMask_Disconnected();
        await this.page.close();
    }

    async Switch_Network(wallet) {
        await this.functionPage.gotoURL();
        await this.functionPage.Connect_Wallet_MetaMask();
        await wallet.approve(); 
        await this.functionPage.Verify_Account_MetaMask_Connected();
        await this.functionPage.Switch_Network_To_Ethereum();
        await this.functionPage.Switch_Network_To_AIOZ();
        await this.page.close();
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async saveCookies() {
        try {
            if (!fs.existsSync(this.dir)) {
                fs.mkdirSync(this.dir, { recursive: true });
            }
            const cookies = await this.page.context().cookies();
            fs.writeFileSync(
                path.join(this.dir, 'cookies_aioz.json'),
                JSON.stringify(cookies, null, 2)
            );
            const storageData = await this.page.evaluate(() => {
                return {
                    localStorage: JSON.stringify(localStorage),
                    sessionStorage: JSON.stringify(sessionStorage),
                    ethereum: window.ethereum ? window.ethereum.selectedAddress : null
                };
            });
            fs.writeFileSync(
                path.join(this.dir, 'storage_aioz.json'),
                JSON.stringify(storageData, null, 2)
            );
            console.log(`✅ Cookies & Storage saved successfully!`);
        } catch (error) {
            console.error("❌ Error saving cookies & storage:", error);
        }
    }
    
    async useCookies() {
        try {
            const cookieFile = path.join(this.dir, 'cookies_aioz.json');
            if (fs.existsSync(cookieFile)) {
                const cookies = JSON.parse(fs.readFileSync(cookieFile, 'utf-8'));
                await this.page.context().addCookies(cookies);
            }
            const storageFile = path.join(this.dir, 'storage_aioz.json');
            if (fs.existsSync(storageFile)) {
                const storageData = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
                await this.page.evaluate((data) => {
                    Object.entries(JSON.parse(data.localStorage)).forEach(([key, value]) =>
                        localStorage.setItem(key, value)
                    );
                    Object.entries(JSON.parse(data.sessionStorage)).forEach(([key, value]) =>
                        sessionStorage.setItem(key, value)
                    );
                }, storageData);
            }
            await this.page.goto('https://aiozswap-web.vercel.app/#/swap', { waitUntil: 'networkidle' });
            console.log("✅ Cookies & Storage loaded successfully!");
        } catch (error) {
            console.error("❌ Error loading cookies & storage:", error);
        }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
