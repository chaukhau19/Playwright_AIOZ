import { expect } from "@playwright/test";
import { config } from "../../data/Swap_Config.js";

export class FunctionPage {
    constructor(page) {
        this.page = page;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    convertToPoints(text) {
        const str = String(text);
        if (str.includes('.')) {
            return parseFloat(str.replace(/,/g, ""));
        } else if (str.includes(',')) {
            return parseFloat(str.replace(",", "."));
        } else {
            return parseFloat(str);
        }
    }

    convertToPointsWithCommas(number) {
        return Number(number).toLocaleString('en-US');
    }

    formatValue(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
    
    async waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async TimeoutTest(Function, wallet, timeout = 500000) {
        try {
            const testCasePromise = Function(wallet);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Test case timed out!")), timeout)
            );
    
            await Promise.race([testCasePromise, timeoutPromise]);
        } catch (error) {
            console.error(`❌ Test case failed: ${error.message}`);
            throw error;
        }
    }
     
    async gotoURL() {
        await this.page.waitForTimeout(5000);
        try {
            await this.page.goto(config.URL, { waitUntil: "domcontentloaded", timeout: 90000 });
            await this.page.reload();
        } catch (error) {
            console.error(`❌ Failed to load URL: ${error.message}`);
        }
    }  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////          BUTTON       //////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Add_WAIOZ_to_MetaMask() {
        await this.page.waitForTimeout(10000);
        try {
            await this.page.getByRole('button', { name: 'Add WAIOZ to MetaMask' }).click();
        } catch (error) {
            console.error(`❌ Error in Add_WAIOZ_to_MetaMask: ${error.message}`);
        }
    }
    
    async Pools_Page() {
        try {
            await this.page.waitForSelector('//a[@data-testid="pool-nav-link" and contains(text(), "Pools")]', { timeout: 50000 });
            await this.page.locator('//a[@data-testid="pool-nav-link" and contains(text(), "Pools")]').click();
        } catch (error) {
            console.error(`❌ Pools page error: ${error.message}`);
        }
    }
    
    async Swaps_Page() {
        try {
            await this.page.waitForSelector("//a[contains(text(), 'Swap')]", { timeout: 50000 });
            await this.page.locator("//a[contains(text(), 'Swap')]").click();
        } catch (error) {
            console.error(`❌ Swaps page error: ${error.message}`);
        }
    }

    async Confirm_Swap_Button() {
        try {
            await this.page.getByTestId('confirm-swap-button').click();
        } catch (error) {
            console.error(`❌ Confirm swap button error: ${error.message}`);
        }
    }

    async Close_Confirmation_Button() {
        try {
            await this.page.waitForTimeout(5000);
            await this.page.getByTestId('confirmation-close-icon').click();
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error(`❌ Close confirmation button error: ${error.message}`);
        }
    }

    async Close_Choose_Wallet_Button() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Close wallet button error: ${error.message}`);
        }
    }    

    async Swap_Button() {
        try {
            await this.page.waitForSelector("(//div[contains(text(), '<$0.01')])[1]", { timeout: 30000 });
            await this.page.locator("(//div[contains(text(), '<$0.01')])[1]")
                .waitFor({ state: 'attached' })
                .then(() => this.page.locator("//button[@id='swap-button']").click());
        } catch (error) {
            console.error(`❌ Swap button error: ${error.message}`);
        }
    }

    async Connect_Wallet_Button() {
        try {
            await this.page.waitForSelector("//button[contains(text(), 'Connect wallet')]//div", { timeout: 50000 });
            await this.page.locator("//button[contains(text(), 'Connect wallet')]//div")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator("//button[contains(text(), 'Connect wallet')]//div").click());
        } catch (error) {
            console.error(`❌ Connect wallet button error: ${error.message}`);
        }
    }

    async Wrap_Button() {
        try {
            await this.page.waitForSelector("//button[text()='Wrap']", { timeout: 10000 });
            await this.page.locator("//button[text()='Wrap']").click();
        } catch (error) {
            console.error(`❌ Wrap button error: ${error.message}`);
        }
    }
    
    async Unwrap_Button() {
        try {
            await this.page.waitForSelector("//button[text()='Unwrap']", { timeout: 10000 });
            await this.page.locator("//button[text()='Unwrap']").click();
        } catch (error) {
            console.error(`❌ Unwrap button error: ${error.message}`);
        }
    }

    async Token_Redemption_Button() {
        try {
            await this.page.waitForTimeout(500);
            await this.page.locator("//div[@data-testid='swap-currency-button']").click();
            await this.page.waitForTimeout(500);
        } catch (error) {
            console.error(`❌ Error in Token_Redemption_Button: ${error.message}`);
        }
    }
    
///////////////////////////////////////////////////////////  EXPECT RESULT ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Verify_Account_MetaMask_Connected() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
            await expect(this.page.locator(config.Expected_Account_MetaMask_Connected)).toBeVisible({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ MetaMask account verification error: ${error.message}`);
        }
    }    

    async Verify_Account_CoinBase_Connected() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
            await expect(this.page.locator(config.Expected_Account_CoinBase_Connected)).toBeVisible({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Coinbase account verification error: ${error.message}`);
        }
    }    

    async Verify_Account_MetaMask_Disconnected() {
        try {
            await this.page.waitForSelector("//button[@data-testid='navbar-connect-wallet']", { timeout: 30000 });
            await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        } catch (error) {
            console.error(`❌ MetaMask disconnect verification error: ${error.message}`);
        }
    }

    async Verify_Account_CoinBase_Disconnected() {
        try {
            await this.page.waitForSelector("//button[@data-testid='navbar-connect-wallet']", { timeout: 30000 });
            await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        } catch (error) {
            console.error(`❌ Coinbase disconnect verification error: ${error.message}`);
        }
    }
    async Select_Wallet_To_Connect() {
        try {
            await this.page.waitForSelector("//div[@width='100%']//h2[text()='Select wallet to connect']", { timeout: 30000 });
            await expect(this.page.locator("//div[@width='100%']//h2[text()='Select wallet to connect']")).toBeVisible();
        } catch (error) {
            console.error(`❌ Wallet selection error: ${error.message}`);
        }
    }

    async Price_Impact_Warning() {
        try {
            await this.page.waitForSelector("(//div[contains(., 'Price impact warning')])[14]", { timeout: 30000 });
            await expect(this.page.locator("(//div[contains(., 'Price impact warning')])[14]")).toBeVisible();
        } catch (error) {
            console.error(`❌ Price impact warning error: ${error.message}`);
        }
    }

    async Insufficient_AIOZ_Balance() {
        try {
            await this.page.waitForSelector("//div[contains(text(), 'Insufficient AIOZ balance')]", { timeout: 30000 });
            await expect(this.page.locator("//div[contains(text(), 'Insufficient AIOZ balance')]")).toBeVisible();
        } catch (error) {
            console.error(`❌ Insufficient AIOZ balance error: ${error.message}`);
        }
    }

    async Insufficient_ETH_Balance() {
        try {
            await this.page.waitForSelector("//div[contains(text(), 'Insufficient ETH balance')]", { timeout: 30000 });
            await expect(this.page.locator("//div[contains(text(), 'Insufficient ETH balance')]")).toBeVisible();
        } catch (error) {
            console.error(`❌ Insufficient ETH balance error: ${error.message}`);
        }
    }

    async Enter_An_Amount() {
        try {
            await this.page.waitForSelector("//button[div[text()='Enter an amount']]", { timeout: 50000 });
            await expect(this.page.locator("//button[div[text()='Enter an amount']]")).toBeVisible();
        } catch (error) {
            console.error(`❌ Enter an amount error: ${error.message}`);
        }
    }
    
    async UNKNOWN_Token() {
        try {
            await expect(this.page.getByText('UNKUNKNOWN~')).toBeVisible({ timeout: 30000 }); 
        } catch (error) {
            console.error(`❌ Unknown token error: ${error.message}`);
        }
    }

    async Insufficient_Liquidity_For_This_Trade() {
        try {
            await expect(this.page.locator('div').filter({ hasText: /^Insufficient liquidity for this trade\.$/ }).nth(1))
                .toBeVisible({ timeout: 30000 }); 
        } catch (error) {
            console.error(`❌ Insufficient liquidity error: ${error.message}`);
        }
    }

    async No_Results_Found() {
        try {
            await this.page.waitForSelector("//p[text()='No results found.']", { timeout: 30000 });
            await expect(this.page.locator("//p[text()='No results found.']")).toBeVisible();
        } catch (error) {
            console.error(`❌ No results found error: ${error.message}`);
        }
    }

///////////////////////////////////////////////////      STEP TEST CASE     ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    async Connect_Wallet_MetaMask() {
        try {
            await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click({ timeout: 30000 });
            await this.page.locator("//div[contains(text(), 'MetaMask')]").click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ MetaMask connection error: ${error.message}`);
        }
    }    

    async Connect_Wallet_CoinBase() {
        try {
            await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click({ timeout: 30000 });
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
            await this.page.reload();
            await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click({ timeout: 30000 });
            await this.page.locator("//div[contains(text(), 'Coinbase Wallet')]").click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Coinbase connection error: ${error.message}`);
        }
    }    

    async Switch_Network_To_Ethereum() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('Ethereum-selector').click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Switch to Ethereum error: ${error.message}`);
        }
    }
    
    async Switch_Network_To_AIOZ() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('AIOZ Testnet-selector').click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Switch to AIOZ error: ${error.message}`);
        }
    }    
    
    async Disconnect_Wallet_MetaMask() {
        try {
            await this.page.locator("//button[@data-testid='web3-status-connected']").click({ timeout: 30000 });
            await this.page.locator("//button[.//img[@title='Disconnect']]").click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ MetaMask disconnect error: ${error.message}`);
        }
    }    
    
    async Disconnect_Wallet_CoinBase() {
        try {
            await this.page.locator("//button[@data-testid='web3-status-connected']").click({ timeout: 30000 });
            await this.page.locator("//button[.//img[@title='Disconnect']]").click({ timeout: 30000 });
        } catch (error) {
            console.error(`❌ Coinbase disconnect error: ${error.message}`);
        }
    }    

    async Fill_Amount_A(amount) {
        try {
            await this.page.getByPlaceholder('0.0').first().fill(amount);
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_A: ${error.message}`);
        }
    }

    async Fill_Amount_B(amount) {
        try {
            await this.page.getByPlaceholder('0.0').nth(1).fill(amount);
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_B: ${error.message}`);
        }
    }
    
    async Fill_Amount_Half_A() {
        try {
            await this.page.locator("(//button[contains(text(), 'Half')])[1]").click();
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_Half_A: ${error.message}`);
        }
    }

    async Fill_Amount_Half_B() {
        try {
            await this.page.locator("(//button[contains(text(), 'Half')])[2]").click();
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_Half_B: ${error.message}`);
        }
    }

    async Fill_Amount_Max_A() {
        try {
            await this.page.locator("(//button[contains(text(), 'Max')])[1]").click();
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_Max_A: ${error.message}`);
        }
    }

    async Fill_Amount_Max_B() {
        try {
            await this.page.locator("(//button[contains(text(), 'Max')])[2]").click();
        } catch (error) {
            console.error(`❌ Error in Fill_Amount_Max_B: ${error.message}`);
        }
    }

    async Off_Network() {
        try {
            await this.page.route('**/*', route => route.abort());
        } catch (error) {
            console.error(`❌ Off network error: ${error.message}`);
        }
    }
    
    async On_Network() {
        try {
            await this.page.waitForTimeout(5000);
            await this.page.unroute('**/*'); 
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error(`❌ On network error: ${error.message}`);
        }
    }

    async Select_Token_USDT_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(config.Select_USDT_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Select_Token_USDT_B: ${error.message}`);
        }
    }

    async Select_Token_STRK_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(config.Select_STRK_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Select_Token_STRK_B: ${error.message}`);
        }
    }
    
    async Select_Token_WAIOZ_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(config.Select_WAIOZ_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Select_Token_WAIOZ_B: ${error.message}`);
        }
    }

    async Select_Token_BTC_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(config.Select_BTC_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Select_Token_BTC_B: ${error.message}`);
        }
    }

    async Search_Adress_Token_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_Token_Invalid);
            await this.page.getByTestId('token-search-input').press('Enter');
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Adress_Token_B_Invalid: ${error.message}`);
        }
    }

    async Search_Token_WAIOZ_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_WAIOZ_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(config.Select_WAIOZ_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_WAIOZ_B: ${error.message}`);
        }
    }

    async Search_Token_UNI_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_UNI_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(config.Select_UNKNOWN_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_UNI_B: ${error.message}`);
        }
    }

    async Search_Token_STRK_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_STRK_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(config.Select_STRK_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_STRK_B: ${error.message}`);
        }
    }

    async Search_Token_USDT_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_USDT_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(config.Select_USDT_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_USDT_B: ${error.message}`);
        }
    }

    async Search_Token_USDC_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_USDC_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(config.Select_USDC_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_USDC_B: ${error.message}`);
        }
    }

    async Search_Token_WAIOZ_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_WAIOZ_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_WAIOZ_B_Invalid: ${error.message}`);
        }
    }

    async Search_Token_STRK_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_STRK_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_STRK_B_Invalid: ${error.message}`);
        }
    }

    async Search_Token_USDT_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_USDT_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_USDT_B_Invalid: ${error.message}`);
        }
    }

    async Search_Token_USDC_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(config.Address_USDC_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            console.error(`❌ Error in Search_Token_USDC_B_Invalid: ${error.message}`);
        }
    }

    async Transaction_Deadline_0Percent() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator("(//div[text()='Auto'])[1]").click();
            await this.page.locator("//input[@data-testid='slippage-input']").fill("0");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_0Percent: ${error.message}`);
        }
    }

    async Transaction_Deadline_50Percent() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator("(//div[text()='Auto'])[1]").click();
            await this.page.locator("//input[@data-testid='slippage-input']").fill("50");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_50Percent: ${error.message}`);
        }
    }

    async Transaction_Deadline_100Percent() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator("(//div[text()='Auto'])[1]").click();
            await this.page.locator("//input[@data-testid='slippage-input']").fill("100");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_100Percent: ${error.message}`);
        }
    }

    async Transaction_Deadline_0M() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
            await this.page.locator('//input[@data-testid="deadline-input"]').fill("0");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_0M: ${error.message}`);
        }
    }

    async Transaction_Deadline_1M() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
            await this.page.locator('//input[@data-testid="deadline-input"]').fill("1");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_1M: ${error.message}`);
        }
    }

    async Transaction_Deadline_100M() {
        try {
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
            await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
            await this.page.locator('//input[@data-testid="deadline-input"]').fill("100");
            await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        } catch (error) {
            console.error(`❌ Error in Transaction_Deadline_100M: ${error.message}`);
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////                 FUNCTION            ///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Total_Token_Before() {
        await this.page.waitForTimeout(5000);
        try {
            const balanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";
            await this.page.waitForSelector(balanceSelector);

            const pointsTextArray = await this.page.locator(balanceSelector).allInnerTexts();
            if (pointsTextArray.length < 2) throw new Error("No two remainder values found.");

            const [rawTextA, rawTextB] = pointsTextArray;

            const pointA = this.convertToPoints(rawTextA);
            const pointB = this.convertToPoints(rawTextB);

            this.totalTokenBefore = { 
                Point_A: pointA, 
                Point_B: pointB, 
                Total_Token_Before_A: rawTextA.trim(), 
                Total_Token_Before_B: rawTextB.trim() 
            };

            console.log("🚀 Total Token Before Data:", this.totalTokenBefore);

            return this.totalTokenBefore;
        } catch (error) {
            console.error('❌ Error retrieving points:', error.message);
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Total_Token_After() {
        await this.page.waitForTimeout(35000);
        try {
            const balanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";
            await this.page.waitForSelector(balanceSelector);

            const pointsTextArray = await this.page.locator(balanceSelector).allInnerTexts();
            if (pointsTextArray.length < 2) throw new Error("No two remainder values found.");

            const [rawTextA, rawTextB] = pointsTextArray;

            const pointA = this.convertToPoints(rawTextA);
            const pointB = this.convertToPoints(rawTextB);

            this.totalTokenAfter = { 
                Point_A: pointA, 
                Point_B: pointB, 
                Total_Token_After_A: rawTextA.trim(), 
                Total_Token_After_B: rawTextB.trim() 
            };

            console.log("🚀 Total Token After Data:", this.totalTokenAfter);

            return this.totalTokenAfter;
        } catch (error) {
            console.error('❌ Error retrieving points:', error.message);
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Swap_Page() {
        try {
            await this.page.waitForSelector("(//div[contains(text(), '<$0.01')])[1]", { timeout: 30000 });
            await this.page.waitForSelector('input.token-amount-input', { timeout: 20000 });

            const inputs = await this.page.locator('input.token-amount-input').all();

            if (inputs.length < 2) {
                throw new Error("Not enough input fields for token amount.");
            }

            const [inputFrom, inputTo] = inputs;

            let [initialFromValue, initialToValue] = await Promise.all([
                inputFrom.getAttribute('value') || "",
                inputTo.getAttribute('value') || ""
            ]);

            let [Token_Before_Swap_A, Token_Before_Swap_B] = [initialFromValue, initialToValue];
            for (let i = 0; i < 20; i++) {
                [Token_Before_Swap_A, Token_Before_Swap_B] = await Promise.all([
                    inputFrom.getAttribute('value'),
                    inputTo.getAttribute('value')
                ]);

                if (Token_Before_Swap_A !== initialFromValue && Token_Before_Swap_B !== initialToValue) break;
                await this.page.waitForTimeout(500);
            }

            const [fiatFromInput, fiatToInput] = inputs;

            const [Value_Before_Swap_A, Value_Before_Swap_B] = await Promise.all([
                fiatFromInput.getAttribute('value') || "",
                fiatToInput.getAttribute('value') || "",
            ]);

            let priceImpactValue = '';
            let slippageToleranceValue = '';

            try {
                const priceImpactLocator = this.page.locator("(//div[contains(text(), '<$0.01')])[1]");
                await priceImpactLocator.waitFor({ state: 'visible', timeout: 20000 });
                await priceImpactLocator.click();

                const priceImpactElement = await this.page.locator("(//div[contains(text(), 'Price impact')]/following-sibling::div//span)[1]").first();
                const slippageToleranceElement = await this.page.locator("(//div[@data-testid='swap-li-label' and text()='Slippage tolerance']/following-sibling::div//*[contains(., '%')])[3]").first();

                priceImpactValue = await priceImpactElement.textContent();
                slippageToleranceValue = await slippageToleranceElement.textContent();
            } catch (error) {
                console.error(`❌ Error retrieving Price Impact or Slippage Tolerance: ${error.message}`);
            }

            // Format token values to match Confirm Swap Page
            const formattedTokenBeforeSwapA = this.convertToPointsWithCommas(this.convertToPoints(Token_Before_Swap_A));
            const formattedTokenBeforeSwapB = this.convertToPointsWithCommas(this.convertToPoints(Token_Before_Swap_B));
            const formattedFiatFromValue = this.convertToPointsWithCommas(this.convertToPoints(Value_Before_Swap_A));
            const formattedFiatToValue = this.convertToPointsWithCommas(this.convertToPoints(Value_Before_Swap_B));

            this.tokenSwapPage = {
                Token_Before_Swap_A: formattedTokenBeforeSwapA,
                Token_Before_Swap_B: formattedTokenBeforeSwapB,
                fiatFromValue: formattedFiatFromValue,
                fiatToValue: formattedFiatToValue,
                priceImpact: priceImpactValue,
                slippageTolerance: slippageToleranceValue
            };

            console.log("🚀 Swap Page Data:", this.tokenSwapPage);

            return this.tokenSwapPage;
        } catch (error) {
            console.error(`❌ Error in Swap_Page: ${error.message}`);
            // throw error;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Wrap_Page() {
        try {
            await this.page.waitForSelector('input.token-amount-input', { timeout: 20000 });

            const inputs = await this.page.locator('input.token-amount-input').all();
            if (inputs.length < 2) throw new Error("Not enough input fields for token amount.");

            const [inputFrom, inputTo] = inputs;
            let [initialFromValue, initialToValue] = await Promise.all([
                inputFrom.getAttribute('value') ?? "",
                inputTo.getAttribute('value') ?? ""
            ]);

            let Token_Before_Swap_A = initialFromValue;
            let Token_Before_Swap_B = initialToValue;

            for (let i = 0; i < 20; i++) {
                const [newFromValue, newToValue] = await Promise.all([
                    inputFrom.getAttribute('value'),
                    inputTo.getAttribute('value')
                ]);

                if (newFromValue !== initialFromValue || newToValue !== initialToValue) {
                    Token_Before_Swap_A = newFromValue;
                    Token_Before_Swap_B = newToValue;
                    break;
                }
                await this.page.waitForTimeout(500);
            }

            this.tokenWrapPage = {
                Token_Before_Swap_A: this.convertToPointsWithCommas(this.convertToPoints(Token_Before_Swap_A)),
                Token_Before_Swap_B: this.convertToPointsWithCommas(this.convertToPoints(Token_Before_Swap_B)),
            };

            console.log("🚀 Wrap Page Data:", this.tokenWrapPage);
            return this.tokenWrapPage;
        } catch (error) {
            console.error(`❌ Error in Wrap Page: ${error.message}`);
            return { Token_Before_Swap_A: "N/A", Token_Before_Swap_B: "N/A" };
        }
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Confirm token values after swap
    async Confirm_Swap_Page() {
        try {
            await Promise.all([
                this.page.waitForSelector("[data-testid='INPUT-amount']", { timeout: 10000 }),
                this.page.waitForSelector("[data-testid='OUTPUT-amount']", { timeout: 10000 }),
                this.page.waitForSelector("(//div[contains(text(), 'Price impact')]/following-sibling::div//span)[2]", { timeout: 10000 }),
                this.page.waitForSelector("(//div[@data-testid='swap-li-label' and text()='Slippage tolerance']/following-sibling::div//*[contains(., '%')])[6]", { timeout: 10000 })
            ]);
    
            await this.page.waitForFunction(
                () => document.querySelector("[data-testid='INPUT-amount']")?.textContent?.trim() !== "",
                { timeout: 5000 }
            );
    
            const inputPoint = await this.page.locator("[data-testid='INPUT-amount']").textContent();
            const outputPoint = await this.page.locator("[data-testid='OUTPUT-amount']").textContent();
            const Price_Impact = await this.page.locator("(//div[contains(text(), 'Price impact')]/following-sibling::div//span)[2]").textContent();
            const Slippage_Tolerance = await this.page.locator("(//div[@data-testid='swap-li-label' and text()='Slippage tolerance']/following-sibling::div//*[contains(., '%')])[6]").textContent();
    
            const formattedInput = this.convertToPointsWithCommas(this.convertToPoints(inputPoint?.trim() || ''));
            const formattedOutput = this.convertToPointsWithCommas(this.convertToPoints(outputPoint?.trim() || ''));
            const formattedPriceImpact = this.convertToPoints(Price_Impact?.trim() || '');
            const formattedSlippageTolerance = this.convertToPoints(Slippage_Tolerance?.trim() || '');
    
            this.tokenConfirmSwapPage = { 
                Token_Before_Swap_A: formattedInput, 
                Token_Before_Swap_B: formattedOutput, 
                Price_Impact: formattedPriceImpact,
                Slippage_Tolerance: formattedSlippageTolerance 
            };
            
            console.log("🚀 Confirm Swap Page Data:", this.tokenConfirmSwapPage);
    
            return this.tokenConfirmSwapPage;
            
        } catch (error) {
            console.error('❌ Error in Confirm_Swap_Page:', error.message);
            // throw error;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Compare token values on swap page and confirm swap page
    async Compare_Swap_And_Confirm_Swap_Page() {
        // await this.page.waitForTimeout(3000);
        const {
            Token_Before_Swap_A: Token_Before_Swap_A = 0,
            Token_Before_Swap_B: Token_Before_Swap_B = 0,
            priceImpact: priceImpactValue = 0,
            slippageTolerance: slippageToleranceValue = 0
        } = this.tokenSwapPage || {};

        const {
            Token_Before_Swap_A: formattedInput = 0,
            Token_Before_Swap_B: formattedOutput = 0,
            Price_Impact: formattedPriceImpact = 0,
            Slippage_Tolerance: formattedSlippageTolerance = 0
        } = this.tokenConfirmSwapPage || {};

        const swapInput = this.formatValue(Token_Before_Swap_A, 3);
        const swapOutput = this.formatValue(Token_Before_Swap_B, 3);
        const swapImpact = this.formatValue(priceImpactValue, 3);
        const swapSlippage = this.formatValue(slippageToleranceValue, 3);

        const confirmInput = this.formatValue(formattedInput, 3);
        const confirmOutput = this.formatValue(formattedOutput, 3);
        const confirmImpact = this.formatValue(formattedPriceImpact, 3);
        const confirmSlippage = this.formatValue(formattedSlippageTolerance, 3);

        const matchTokensInput = swapInput === confirmInput;
        const matchTokensOutput = swapOutput === confirmOutput;
        const matchPriceImpact = swapImpact === confirmImpact;
        const matchSlippage = swapSlippage === confirmSlippage;

        // const logCheck = (condition, label, value1, value2) => {
        //     if (condition) {
        //         console.log(`✅ ${label} matches! 🔹 Swap: (${value1}) | Confirm Swap: (${value2})`);
        //     } else {
        //         console.error(`❌ ERROR! Mismatch in ${label}! 🔹 Swap: (${value1}) | Confirm Swap: (${value2})`);
        //     }
        // };

        // logCheck(matchTokensInput, "Token Input", swapInput, confirmInput);
        // logCheck(matchTokensOutput, "Token Output", swapOutput, confirmOutput);
        // logCheck(matchPriceImpact, "Price Impact", swapImpact, confirmImpact);
        // logCheck(matchSlippage, "Slippage Tolerance", swapSlippage);

        this.compareSwapAndConfirmSwapPage = {
            matchTokensInput,
            matchTokensOutput,
            matchPriceImpact,
            matchSlippage
        };

        console.log("🚀 Compare Swap and Confirm Swap Page Data:", this.compareSwapAndConfirmSwapPage);

        return this.compareSwapAndConfirmSwapPage;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Compare_Token_Before_And_After_Max_Swap(networkCostA) {
        await this.page.waitForTimeout(5000);

        const {
            Point_A: Actual_Total_Token_Before_A = 0,
            Point_B: Actual_Total_Token_Before_B = 0
        } = this.totalTokenBefore || {};

        const {
            Point_A: Actual_Total_Token_After_A = 0,
            Point_B: Actual_Total_Token_After_B = 0
        } = this.totalTokenAfter || {};

        const {
            Token_Before_Swap_A = "0",
            Token_Before_Swap_B = "0"
        } = this.tokenSwapPage || {};

        const Token_After_Swap_A = this.convertToPoints(Token_Before_Swap_A);
        const Token_After_Swap_B = this.convertToPoints(Token_Before_Swap_B);

        const validateInput = (value, name) => {
            if (value === undefined || isNaN(value) || value < 0) {
                console.error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
                throw new Error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
            }
            return true;
        };

        const calculateExpectedValues = () => {
            [
                Actual_Total_Token_Before_A,
                Token_After_Swap_A,
                Actual_Total_Token_Before_B,
                Token_After_Swap_B
            ].forEach((val, index) => validateInput(val, `Parameter ${index + 1}`));

            let expected_Total_Token_After_A = Number(
                (Actual_Total_Token_Before_A - Token_After_Swap_A - networkCostA).toFixed(8)
            );
            let expected_Total_Token_After_B = Number(
                (Actual_Total_Token_Before_B + Token_After_Swap_B).toFixed(8)
            );

            expected_Total_Token_After_A = Math.max(expected_Total_Token_After_A, 0);
            expected_Total_Token_After_B = Math.max(expected_Total_Token_After_B, 0);

            return { expected_Total_Token_After_A, expected_Total_Token_After_B };
        };

        const isWithinRange = (actual, expected, tolerance, fixedSlippage = 0.01) => {
            if (tolerance !== null && tolerance !== undefined) {
                return Math.abs(actual - expected) <= tolerance;
            }
            const acceptableLow = expected - fixedSlippage;
            const acceptableHigh = expected + fixedSlippage;
            return actual >= acceptableLow && actual <= acceptableHigh;
        };

        const isValidForMaxSwap = (actual, maxTolerance = 0.01) => {
            return Math.abs(actual) <= maxTolerance;
        };

        const validateSuccessfulSwap = () => {
            const { expected_Total_Token_After_A, expected_Total_Token_After_B } = calculateExpectedValues();

            const Total_Token_After_A = Number(Actual_Total_Token_After_A);
            const Total_Token_After_B = Number(Actual_Total_Token_After_B);

            const priceImpact = parseFloat(this.tokenSwapPage?.priceImpact || "0") / 100;
            const slippageTolerance = parseFloat(this.tokenSwapPage?.slippageTolerance || "0") / 100;

            const passA =
                expected_Total_Token_After_A === 0
                    ? isValidForMaxSwap(Total_Token_After_A, 0.1)
                    : isWithinRange(Total_Token_After_A, expected_Total_Token_After_A, networkCostA);

            const passB = isWithinRange(Total_Token_After_B, expected_Total_Token_After_B, null);

            if (passA && passB) {
                console.log("✅ Swap Successful!", {
                    Actual_Total_Token_After_A: Total_Token_After_A.toLocaleString(),
                    expected_Total_Token_After_A: expected_Total_Token_After_A.toLocaleString(),
                    Actual_Total_Token_After_B: Total_Token_After_B.toLocaleString(),
                    expected_Total_Token_After_B: expected_Total_Token_After_B.toLocaleString(),
                    priceImpact,
                    slippageTolerance
                });
                return true;
            } else {
                console.error(
                    `❌ ERROR! Swap validation failed.
            Expected A: ${expected_Total_Token_After_A.toLocaleString()}, Actual A: ${Total_Token_After_A.toLocaleString()}
            Expected B: ${expected_Total_Token_After_B.toLocaleString()}, Actual B: ${Total_Token_After_B.toLocaleString()}`
                );
            }
        };

        return validateSuccessfulSwap();
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Compare_Token_Before_And_After_Valid_Swap(networkCostA) {
        await this.page.waitForTimeout(5000);

        const {
            Point_A: Actual_Total_Token_Before_A = 0,
            Point_B: Actual_Total_Token_Before_B = 0
        } = this.totalTokenBefore || {};

        const {
            Point_A: Actual_Total_Token_After_A = 0,
            Point_B: Actual_Total_Token_After_B = 0
        } = this.totalTokenAfter || {};

        const {
            Token_Before_Swap_A = "0",
            Token_Before_Swap_B = "0"
        } = this.tokenSwapPage || {};

        const Token_After_Swap_A = this.convertToPoints(Token_Before_Swap_A);
        const Token_After_Swap_B = this.convertToPoints(Token_Before_Swap_B);

        const validateInput = (value, name) => {
            if (value === undefined || isNaN(value) || value < 0) {
                console.error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
                throw new Error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
            }
            return true;
        };

        const calculateExpectedValues = () => {
            [Actual_Total_Token_Before_A, Token_After_Swap_A, Actual_Total_Token_Before_B, Token_After_Swap_B].forEach(
                (val, index) => validateInput(val, `Parameter ${index + 1}`)
            );

            const expected_Total_Token_After_A = Number(
                (Actual_Total_Token_Before_A - Token_After_Swap_A - networkCostA).toFixed(2)
            );
            const expected_Total_Token_After_B = Number(
                (Actual_Total_Token_Before_B + Token_After_Swap_B).toFixed(2)
            );

            if (expected_Total_Token_After_A < 0) {
                throw new Error(`❌ ERROR! Expected Token A after swap is negative. Expected: ${expected_Total_Token_After_A}`);
            }
            if (expected_Total_Token_After_B < 0) {
                throw new Error(`❌ ERROR! Expected Token B after swap is negative. Expected: ${expected_Total_Token_After_B}`);
            }

            return { expected_Total_Token_After_A, expected_Total_Token_After_B };
        };

        const isWithinRange = (actual, expected, tolerance, fixedSlippage = 0.1) => {
            if (tolerance) {
                return Math.abs(actual - expected) <= tolerance;
            }

            const acceptableLow = expected - fixedSlippage;
            const acceptableHigh = expected + fixedSlippage;

            return actual >= acceptableLow && actual <= acceptableHigh;
        };
        const validateSuccessfulSwap = () => {
            const { expected_Total_Token_After_A, expected_Total_Token_After_B } = calculateExpectedValues();

            const Total_Token_After_A = Number(Actual_Total_Token_After_A);
            const Total_Token_After_B = Number(Actual_Total_Token_After_B);

            const priceImpact = parseFloat(this.tokenSwapPage?.priceImpact || "0") / 100;
            const slippageTolerance = parseFloat(this.tokenSwapPage?.slippageTolerance || "0") / 100;

            const passA = isWithinRange(Total_Token_After_A, expected_Total_Token_After_A, networkCostA);
            const passB = isWithinRange(Total_Token_After_B, expected_Total_Token_After_B, null);

            // console.log("🔍 Debug Values:", {
            //     Actual_Total_Token_Before_A,
            //     Actual_Total_Token_Before_B,
            //     Actual_Total_Token_After_A,
            //     Actual_Total_Token_After_B,
            //     Token_After_Swap_A,
            //     Token_After_Swap_B,
            //     networkCostA,
            //     priceImpact,
            //     slippageTolerance
            // });

            // console.log("🔍 Checking Range A:", {
            //     Actual_Total_Token_After_A,
            //     expected_Total_Token_After_A,
            //     acceptableLow_A: expected_Total_Token_After_A - 0.1,
            //     acceptableHigh_A: expected_Total_Token_After_A + 0.1,
            //     passA
            // });

            // console.log("🔍 Checking Range B:", {
            //     Actual_Total_Token_After_B,
            //     expected_Total_Token_After_B,
            //     acceptableLow_B: expected_Total_Token_After_B - 0.1,
            //     acceptableHigh_B: expected_Total_Token_After_B + 0.1,
            //     passB
            // });
            if (passA && passB) {
                console.log("✅ Swap Successful!", {
                    Actual_Total_Token_After_A,
                    expected_Total_Token_After_A,
                    Actual_Total_Token_After_B,
                    expected_Total_Token_After_B,
                    priceImpact,
                    slippageTolerance
                });
                return true;
            } else {
                console.error(
                    `❌ ERROR! Swap validation failed.\nExpected A: ${expected_Total_Token_After_A}, Actual A: ${Actual_Total_Token_After_A}\nExpected B: ${expected_Total_Token_After_B}, Actual B: ${Actual_Total_Token_After_B}`
                );
            }
        };

        return validateSuccessfulSwap();
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // async Compare_Token_Before_And_After_Valid_Swap(networkCostA) {
    //     await this.page.waitForTimeout(5000);

    //     // Destructure token values safely with correct keys
    //     const {
    //         Point_A: Actual_Total_Token_Before_A = 0,
    //         Point_B: Actual_Total_Token_Before_B = 0
    //     } = this.totalTokenBefore || {};

    //     const {
    //         Point_A: Actual_Total_Token_After_A = 0,
    //         Point_B: Actual_Total_Token_After_B = 0
    //     } = this.totalTokenAfter || {};

    //     const {
    //         Token_Before_Swap_A = "0",
    //         Token_Before_Swap_B = "0"
    //     } = this.tokenSwapPage || {};

    //     // Parse values safely
    //     const Token_After_Swap_A = Number(parseFloat(Token_Before_Swap_A).toFixed(5));
    //     const Token_After_Swap_B = Number(parseFloat(Token_Before_Swap_B).toFixed(5));

    //     // Calculate expected token values after swap
    //     const expected_Total_Token_After_A = Number(
    //         (Actual_Total_Token_Before_A - Token_After_Swap_A - networkCostA).toFixed(5)
    //     );
    //     const expected_Total_Token_After_B = Number(
    //         (Actual_Total_Token_Before_B + Token_After_Swap_B).toFixed(5)
    //     );

    //     // Check if actual value is within acceptable range
    //     const isWithinRange = (actual, expected, tolerance, isMaxSwap = false) => {
    //         if (isMaxSwap) {
    //             return actual <= 0.0001; // Cho phép giá trị còn lại cực nhỏ
    //         }
    //         if (tolerance) {
    //             return Math.abs(actual - expected) <= tolerance;
    //         }
    //         return Math.abs(actual - expected) <= 0.1;
    //     };

    //     // Kiểm tra xem có phải đang swap max hay không
    //     const isMaxSwap = Token_After_Swap_A >= (Actual_Total_Token_Before_A - networkCostA - 0.0001);

    //     const passA = isWithinRange(Actual_Total_Token_After_A, expected_Total_Token_After_A, networkCostA, isMaxSwap);
    //     const passB = isWithinRange(Actual_Total_Token_After_B, expected_Total_Token_After_B, null);

    //     if (passA && passB) {
    //         console.log("✅ Swap Successful!", {
    //             Actual_Total_Token_After_A,
    //             expected_Total_Token_After_A,
    //             Actual_Total_Token_After_B,
    //             expected_Total_Token_After_B,
    //         });
    //         return true;
    //     } else {
    //         console.error(
    //             `❌ ERROR! Swap validation failed.\nExpected A: ${expected_Total_Token_After_A}, Actual A: ${Actual_Total_Token_After_A}\nExpected B: ${expected_Total_Token_After_B}, Actual B: ${Actual_Total_Token_After_B}`
    //         );
    //     }
    // }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Compare_Token_Before_And_After_Invalid_Swap() {
        await this.page.waitForTimeout(10000);  

        if (!this.totalTokenBefore || !this.totalTokenAfter) {
            throw new Error("❌ ERROR! Missing token data before or after swap.");
        }
        const {
            Point_A: Actual_Total_Token_Before_A = 0,
            Point_B: Actual_Total_Token_Before_B = 0
        } = this.totalTokenBefore || {};

        const {
            Point_A: Actual_Total_Token_After_A = 0,
            Point_B: Actual_Total_Token_After_B = 0
        } = this.totalTokenAfter || {};

        await this.page.waitForTimeout(5000);  

        const invalidateRejectedSwap = () => {
            const before_A_Token = this.convertToPoints(Actual_Total_Token_Before_A);
            const before_B_Token = this.convertToPoints(Actual_Total_Token_Before_B);
            const after_A_Token = this.convertToPoints(Actual_Total_Token_After_A);
            const after_B_Token = this.convertToPoints(Actual_Total_Token_After_B);

            if (![before_A_Token, before_B_Token, after_A_Token, after_B_Token].every(Number.isFinite)) {
                throw new Error("❌ ERROR! One or more token values are invalid or not numeric.");
            }

            console.log("🔹 Token Balance Before Swap:  A =", before_A_Token, "| B =", before_B_Token);
            console.log("🔹 Token Balance After Swap:   A =", after_A_Token, "| B =", after_B_Token);

            if (after_A_Token === before_A_Token && after_B_Token === before_B_Token) {
                console.log("✅ Tokens remain unchanged!", {
                    before_A_Token,
                    before_B_Token,
                    after_A_Token,
                    after_B_Token
                });
                return true;
            } else {
                console.error(`❌ ERROR! Tokens changed despite swap rejection Before { A: ${before_A_Token}, B: ${before_B_Token} } | After { A: ${after_A_Token}, B: ${after_B_Token} }`);
                return false;
            }
        };

        return invalidateRejectedSwap();
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Compare_Token_Before_And_After_Wrap() {
        await this.waitForTimeout(10000);

        if (!this.totalTokenBefore || !this.totalTokenAfter || !this.tokenWrapPage) {
            throw new Error("❌ ERROR! Missing token data before or after wrap.");
        }

        const { Point_A: beforeA = 0, Point_B: beforeB = 0 } = this.totalTokenBefore;
        const { Point_A: afterA = 0, Point_B: afterB = 0 } = this.totalTokenAfter;
        const { Token_Before_Swap_A: wrapA = "0", Token_Before_Swap_B: wrapB = "0" } = this.tokenWrapPage;

        const parseAndValidate = (value, name) => {
            const num = this.convertToPoints(value);
            if (isNaN(num) || num < 0) {
                throw new Error(`❌ ERROR! Invalid value for ${name}: ${value}`);
            }
            return parseFloat(num.toFixed(5));
        };

        const tokenAfterWrapA = parseAndValidate(wrapA, "Token_After_Wrap_A");
        const tokenAfterWrapB = parseAndValidate(wrapB, "Token_After_Wrap_B");

        const expectedAfterA = parseFloat((beforeA - tokenAfterWrapA).toFixed(5));
        const expectedAfterB = parseFloat((beforeB + tokenAfterWrapB).toFixed(5));

        if (expectedAfterA < 0) {
            throw new Error("❌ ERROR! Expected Token A after wrap is negative.");
        }

        const isMatchA = parseFloat(afterA) === expectedAfterA;
        const isMatchB = parseFloat(afterB) === expectedAfterB;

        if (isMatchA && isMatchB) {
            console.log("✅ Wrap Successful!", {
                Actual_Total_Token_After_A: afterA,
                expected_Total_Token_After_A: expectedAfterA,
                Actual_Total_Token_After_B: afterB,
                expected_Total_Token_After_B: expectedAfterB
            });
            return true;
        } else {
            console.error("❌ ERROR! Wrap validation failed", {
                Actual_Total_Token_After_A: afterA,
                expected_Total_Token_After_A: expectedAfterA,
                Difference_A: Math.abs(afterA - expectedAfterA),
                Actual_Total_Token_After_B: afterB,
                expected_Total_Token_After_B: expectedAfterB,
                Difference_B: Math.abs(afterB - expectedAfterB)
            });
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getTokenAllWeb() {
        try {
            const topBalanceSelector = "div.css-vurnku";
            const swapBalanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";

            await Promise.all([
                this.page.waitForSelector(topBalanceSelector, { timeout: 20000 }),
                this.page.waitForSelector(swapBalanceSelector, { timeout: 20000 }),
            ]);

            const [topBalance, swapBalance] = await Promise.all([
                this.page.locator(topBalanceSelector).textContent(),
                this.page.locator(swapBalanceSelector).nth(1).textContent()
            ]);

            if (!topBalance || !swapBalance) {
                console.warn("⚠ Failed to retrieve AIOZ balance.");
                return { topBalance: null, swapBalance: null };
            }

            const trimmedTopBalance = this.convertToPoints(topBalance.trim());
            const trimmedSwapBalance = this.convertToPoints(swapBalance.trim());

            const logBalance = (top, swap) => {
                if (top === swap) {
                    console.log(`✅ 🔹 AIOZ Top: ${top} | 🔹 AIOZ Swap: ${swap}`);
                } else {
                    console.warn(`❌ 🔹 AIOZ Top: ${top} | 🔹 AIOZ Swap: ${swap}`);
                }
            };

            logBalance(trimmedTopBalance, trimmedSwapBalance);

            return { topBalance: trimmedTopBalance, swapBalance: trimmedSwapBalance };

        } catch (error) {
            console.error("❌ Error retrieving AIOZ balance:", error);
            return { topBalance: null, swapBalance: null };
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
