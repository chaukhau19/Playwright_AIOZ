import { expect } from "@playwright/test";
import { config } from "../../data/Swap_Config.js";

export class FunctionPage {
    constructor(page) {
        this.page = page;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertToPoints(text) {
        if (text.includes('.')) {
            return parseFloat(text.replace(/,/g, ""));
        } else if (text.includes(',')) {
            return parseFloat(text.replace(",", "."));
        } else {
            return parseFloat(text);
        }
    }
    
    async waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async TimeoutTest(Function, wallet, timeout = 200000) {
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
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async gotoURL() {
        await this.page.waitForTimeout(5000);
        await this.page.goto(config.URL, { waitUntil: "domcontentloaded", timeout: 90000 });
        await this.page.reload();
    }
    
    async Pools_Page() {
        try {
            await this.page.waitForSelector('//a[@data-testid="pool-nav-link" and contains(text(), "Pools")]', { timeout: 30000 });
            await this.page.locator('//a[@data-testid="pool-nav-link" and contains(text(), "Pools")]').click();
        } catch (error) {
            throw new Error("❌ Pools Page did not appear");
        }
    }
    
    async Swaps_Page() {
        try {
            await this.page.waitForSelector("//a[contains(text(), 'Swap')]", { timeout: 30000 });
            await this.page.locator("//a[contains(text(), 'Swap')]").click();
        } catch (error) {
            throw new Error("❌ Swaps Page did not appear");
        }
    }

    async Confirm_Swap_Button() {
        await this.page.getByTestId('confirm-swap-button').click();
    }

    async Close_Confirmation_Button() {
        await this.page.waitForTimeout(5000);
        await this.page.getByTestId('confirmation-close-icon').click();
        await this.page.waitForTimeout(5000);
    }

    async Close_Choose_Wallet_Button() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Close failed!");
        }
    }    
    
    async Connect_Wallet_MetaMask() {
        try {
            await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click({ timeout: 30000 });
            await this.page.locator("//div[contains(text(), 'MetaMask')]").click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Connect failed!");
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
            throw new Error("❌ Connect failed!");
        }
    }    

    async Switch_Network_To_Ethereum() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('Ethereum-selector').click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Switch failed!");
        }
    }
    
    async Switch_Network_To_AIOZ() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('AIOZ Testnet-selector').click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Switch failed!");
        }
    }    
    
    async Disconnect_Wallet_MetaMask() {
        try {
            await this.page.locator("//button[@data-testid='web3-status-connected']").click({ timeout: 30000 });
            await this.page.locator("//button[.//img[@title='Disconnect']]").click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Disconnect failed!");
        }
    }    
    
    async Disconnect_Wallet_CoinBase() {
        try {
            await this.page.locator("//button[@data-testid='web3-status-connected']").click({ timeout: 30000 });
            await this.page.locator("//button[.//img[@title='Disconnect']]").click({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Disconnect failed!");
        }
    }    

    async Verify_Account_MetaMask_Connected() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
            await expect(this.page.locator(config.Expected_Account_MetaMask_Connected)).toBeVisible({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ MetaMask verify failed!");
        }
    }    

    async Verify_Account_CoinBase_Connected() {
        try {
            await this.page.locator("//img[@alt='Close' or @title='Close']").click({ timeout: 30000 });
            await expect(this.page.locator(config.Expected_Account_CoinBase_Connected)).toBeVisible({ timeout: 30000 });
        } catch (error) {
            throw new Error("❌ Coinbase verify failed!");
        }
    }    

    async Verify_Account_MetaMask_Disconnected() {
        try {
            await this.page.waitForSelector("//button[@data-testid='navbar-connect-wallet']", { timeout: 30000 });
            await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        } catch (error) {
            throw new Error("Navbar connect wallet button did not appear");
        }
    }

    async Verify_Account_CoinBase_Disconnected() {
        try {
            await this.page.waitForSelector("//button[@data-testid='navbar-connect-wallet']", { timeout: 30000 });
            await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        } catch (error) {
            throw new Error("Navbar connect wallet button did not appear");
        }
    }
    
    async Select_Wallet_To_Connect() {
        try {
            await this.page.waitForSelector("//div[@width='100%']//h2[text()='Select wallet to connect']", { timeout: 30000 });
            await expect(this.page.locator("//div[@width='100%']//h2[text()='Select wallet to connect']")).toBeVisible();
        } catch (error) {
            throw new Error("Enter an amount button not found");
        }
    }

    async Price_Impact_Warning() {
        try {
            await this.page.waitForSelector("(//div[contains(., 'Price impact warning')])[14]", { timeout: 30000 });
            await expect(this.page.locator("(//div[contains(., 'Price impact warning')])[14]")).toBeVisible();
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }

    async Insufficient_AIOZ_Balance() {
        try {
            await this.page.waitForSelector("//div[contains(text(), 'Insufficient AIOZ balance')]", { timeout: 30000 });
            await expect(this.page.locator("//div[contains(text(), 'Insufficient AIOZ balance')]")).toBeVisible();
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }

    async Insufficient_ETH_Balance() {
        try {
            await this.page.waitForSelector("//div[contains(text(), 'Insufficient ETH balance')]", { timeout: 30000 });
            await expect(this.page.locator("//div[contains(text(), 'Insufficient ETH balance')]")).toBeVisible();
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }

    async Enter_An_Amount() {
        try {
            await this.page.waitForSelector("//button[div[text()='Enter an amount']]", { timeout: 50000 });
            await expect(this.page.locator("//button[div[text()='Enter an amount']]")).toBeVisible();
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }
    
    async UNKNOWN_Token() {
        try {
            await expect(this.page.getByText('UNKUNKNOWN~')).toBeVisible({ timeout: 30000 }); 
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }

    async Insufficient_Liquidity_For_This_Trade() {
        try {
            await expect(this.page.locator('div').filter({ hasText: /^Insufficient liquidity for this trade\.$/ }).nth(1))
                .toBeVisible({ timeout: 30000 }); 
        } catch (error) {
            throw new Error("❌ Insufficient liquidity for this trade message not found");
        }
    }

    async No_Results_Found() {
        try {
            await this.page.waitForSelector("//p[text()='No results found.']", { timeout: 30000 });
            await expect(this.page.locator("//p[text()='No results found.']")).toBeVisible();
        } catch (error) {
            throw new Error("Wallet connection pop-up not found");
        }
    }
    
    async Fill_Amount_A(amount) {
        await this.page.getByPlaceholder('0.0').first().fill(amount);
        await this.page.waitForTimeout(10000);
    }

    async Fill_Amount_B(amount) {
        await this.page.getByPlaceholder('0.0').eth(1).fill(amount);
        await this.page.waitForTimeout(10000);
    }
    
    async Fill_Amount_Half_A() {
        await this.page.locator("(//button[contains(text(), 'Half')])[1]").click();
        await this.page.waitForTimeout(10000);
    }

    async Fill_Amount_Half_B() {
        await this.page.locator("(//button[contains(text(), 'Half')])[2]").click();
        await this.page.waitForTimeout(10000);
    }

    async Fill_Amount_Max_A() {
        await this.page.locator("(//button[contains(text(), 'Max')])[1]").click();
        await this.page.waitForTimeout(10000);
    }

    async Fill_Amount_Max_B() {
        await this.page.locator("(//button[contains(text(), 'Max')])[2]").click();
        await this.page.waitForTimeout(10000);
    }

    async Token_Redemption_Button() {
        await this.page.waitForTimeout(500);
        await this.page.locator("//div[@data-testid='swap-currency-button']").click();
        await this.page.waitForTimeout(500);
    }
    
    async Swap_Button() {
        try {
            await this.page.waitForSelector("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]", { timeout: 50000 });
            await this.page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator('[data-testid="swap-button"]').click());
        } catch (error) {
            throw new Error("Swap Button not found");
        }
    }

    async Connect_Wallet_Button() {
        try {
            await this.page.waitForSelector("//button[contains(text(), 'Connect wallet')]//div", { timeout: 50000 });
            await this.page.locator("//button[contains(text(), 'Connect wallet')]//div")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator("//button[contains(text(), 'Connect wallet')]//div").click());
        } catch (error) {
            throw new Error("Connect wallet Button not found");
        }
        // await this.page.locator("//button[contains(text(), 'Connect wallet')]//div")
        //     .waitFor({ state: 'attached' })
        //     .then(() => this.page.locator("//button[contains(text(), 'Connect wallet')]//div").click());
    }

    async Wrap_Button() {
        await this.page.waitForSelector("//button[text()='Wrap']", { timeout: 10000 });
        await this.page.locator("//button[text()='Wrap']").click();
    }
    
    async Unwrap_Button() {
        await this.page.waitForSelector("//button[text()='Unwrap']", { timeout: 10000 });
        await this.page.locator("//button[text()='Unwrap']").click();
    }

    async Off_Network() {
        await this.page.route('**/*', route => route.abort());
    }
    
    async On_Network() {
        await this.page.waitForTimeout(5000);
        await this.page.unroute('**/*'); 
        await this.page.waitForTimeout(5000);
    }
    

    async Select_Token_USDT_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText(config.Select_USDT_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Select_Token_STRK_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText(config.Select_STRK_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }
    
    async Select_Token_WAIOZ_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText(config.Select_WAIOZ_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Select_Token_BTC_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText(config.Select_BTC_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Adress_Token_B_Invalid() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_Token_Invalid);
        await this.page.getByTestId('token-search-input').press('Enter');
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_WAIOZ_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_WAIOZ_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.getByText(config.Select_WAIOZ_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_UNI_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_UNI_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.getByText(config.Select_UNKNOWN_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_STRK_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_STRK_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.getByText(config.Select_STRK_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_USDT_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_USDT_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.getByText(config.Select_USDT_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_USDC_B() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_USDC_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.getByText(config.Select_USDC_Token).click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_WAIOZ_B_Invalid() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_WAIOZ_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_STRK_B_Invalid() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_STRK_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_USDT_B_Invalid() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_USDT_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Search_Token_USDC_B_Invalid() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByTestId('token-search-input').click();
        await this.page.getByTestId('token-search-input').fill(config.Address_USDC_Token);
        await this.page.getByTestId('token-search-input').press('Enter');
        await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
        const understandButton = this.page.getByRole('button', { name: 'I understand' });
        if (await understandButton.isVisible()) {
            await understandButton.click();
        }
    }

    async Transaction_Deadline_0Percent() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator("(//div[text()='Auto'])[1]").click();
        await this.page.locator("//input[@data-testid='slippage-input']").fill("0");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

    async Transaction_Deadline_50Percent() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator("(//div[text()='Auto'])[1]").click();
        await this.page.locator("//input[@data-testid='slippage-input']").fill("50");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

    async Transaction_Deadline_100Percent() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator("(//div[text()='Auto'])[1]").click();
        await this.page.locator("//input[@data-testid='slippage-input']").fill("100");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

    async Transaction_Deadline_0M() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
        await this.page.locator('//input[@data-testid="deadline-input"]').fill("0");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

    async Transaction_Deadline_1M() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
        await this.page.locator('//input[@data-testid="deadline-input"]').fill("1");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

    async Transaction_Deadline_100M() {
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
        await this.page.locator('//div[@data-testid="transaction-deadline-settings"]').click();
        await this.page.locator('//input[@data-testid="deadline-input"]').fill("100");
        await this.page.locator("//button[@aria-label='Transaction Settings']").click();
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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

            // console.log("🚀 Total Token Before Data:", this.totalTokenBefore);

            return this.totalTokenBefore;
        } catch (error) {
            console.error('❌ Error retrieving points:', error.message);
            throw error;
        }
    }

    async Total_Token_After() {
        await this.page.waitForTimeout(30000);
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
    
            // console.log("🚀 Total Token After Data:", this.totalTokenAfter);
    
            return this.totalTokenAfter;
        } catch (error) {
            console.error('❌ Error retrieving points:', error.message);
            throw error;
        }
    }
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Swap_Page() {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('input.token-amount-input', { timeout: 20000 });

        const [inputFrom, inputTo] = await this.page.locator('input.token-amount-input').all();
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

        const [fiatFromInput, fiatToInput] = await this.page.locator('input.token-amount-input').all();
        const [Value_Before_Swap_A, Value_Before_Swap_B] = await Promise.all([
            fiatFromInput.getAttribute('value'),
            fiatToInput.getAttribute('value')
        ]);

        try {
            const priceImpactLocator = this.page.locator("(//div[contains(text(), '<$0.01')])[1]");
            await priceImpactLocator.waitFor({ state: 'visible', timeout: 20000 });
            await priceImpactLocator.click();
        } catch {
        }

        const priceImpactElement = await this.page.locator("(//span[contains(text(), '%')])[1]").first();
        const slippageToleranceElement = await this.page.locator("(//div[@data-testid='swap-li-label' and text()='Slippage tolerance']/following-sibling::div//*[contains(., '%')])[3]").first();
        
        const priceImpactValue = await priceImpactElement.textContent();
        const slippageToleranceValue = await slippageToleranceElement.textContent();

        this.tokenSwapPage = {
            Token_Before_Swap_A: Token_Before_Swap_A,
            Token_Before_Swap_B: Token_Before_Swap_B,
            fiatFromValue: Value_Before_Swap_A,
            fiatToValue: Value_Before_Swap_B,
            priceImpact: priceImpactValue,
            slippageTolerance: slippageToleranceValue
        };

        // console.log("🚀 Swap Page Data:", this.tokenSwapPage);

        return this.tokenSwapPage;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    
            const formattedInput = inputPoint?.trim() || '';
            const formattedOutput = outputPoint?.trim() || '';
            const formattedPriceImpact = Price_Impact?.trim() || '';
            const formattedSlippageTolerance = Slippage_Tolerance?.trim() || '';
    
            this.tokenConfirmSwapPage = { 
                Token_Before_Swap_A: formattedInput, 
                Token_Before_Swap_B: formattedOutput, 
                Price_Impact: formattedPriceImpact,
                Slippage_Tolerance: formattedSlippageTolerance 
            };
            
            // console.log("🚀 Confirm Swap Page Data:", this.tokenConfirmSwapPage);

            return this.tokenConfirmSwapPage;
            
        } catch (error) {
            console.error('❌ Error in Confirm_Swap_Page:', error.message);
            throw error;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Compare_Token_Before_And_After_Valid_Swap(networkCostA) {
        await this.page.waitForTimeout(5000);

        // Destructure token values safely with correct keys
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

        // Parse values safely
        const Token_After_Swap_A = Number(parseFloat(Token_Before_Swap_A).toFixed(5));
        const Token_After_Swap_B = Number(parseFloat(Token_Before_Swap_B).toFixed(5));

        // Validate input values
        const validateInput = (value, name) => {
            if (value === undefined || isNaN(value) || value < 0) {
                throw new Error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
            }
            return true;
        };

        // Calculate expected token values after swap
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

            // Check if expected values are negative
            if (expected_Total_Token_After_A < 0) {
                throw new Error(`❌ ERROR! Expected Token A after swap is negative. Expected: ${expected_Total_Token_After_A}`);
            }
            if (expected_Total_Token_After_B < 0) {
                throw new Error(`❌ ERROR! Expected Token B after swap is negative. Expected: ${expected_Total_Token_After_B}`);
            }

            return { expected_Total_Token_After_A, expected_Total_Token_After_B };
        };

        // Check if actual value is within acceptable range
        const isWithinRange = (actual, expected, tolerance, fixedSlippage = 0.1) => {
            // If tolerance is provided (e.g., for network cost), use it
            if (tolerance) {
                return Math.abs(actual - expected) <= tolerance;
            }

            // Apply fixed slippage directly to the expected value
            const acceptableLow = expected - fixedSlippage;
            const acceptableHigh = expected + fixedSlippage;

            return actual >= acceptableLow && actual <= acceptableHigh;
        };

        // Validate swap success
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
                throw new Error(
                    `❌ ERROR! Swap validation failed.\nExpected A: ${expected_Total_Token_After_A}, Actual A: ${Actual_Total_Token_After_A}\nExpected B: ${expected_Total_Token_After_B}, Actual B: ${Actual_Total_Token_After_B}`
                );
            }
        };

        return validateSuccessfulSwap();
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Compare_Token_Before_And_After_Invalid_Swap() {
        await this.page.waitForTimeout(10000);  

        if (!this.totalTokenBefore || !this.totalTokenAfter) {
            throw new Error("❌ ERROR! Missing token data before or after swap.");
        }

        const { Point_A: Actual_Total_Token_Before_A, Point_B: Actual_Total_Token_Before_B } = this.totalTokenBefore;
        const { Point_A: Actual_Total_Token_After_A, Point_B: Actual_Total_Token_After_B } = this.totalTokenAfter;

        await this.page.waitForTimeout(5000);  

        const invalidateRejectedSwap = () => {
            const before_A_Token = parseFloat(Actual_Total_Token_Before_A);
            const before_B_Token = parseFloat(Actual_Total_Token_Before_B);
            const after_A_Token = parseFloat(Actual_Total_Token_After_A);
            const after_B_Token = parseFloat(Actual_Total_Token_After_B);

            if ([before_A_Token, before_B_Token, after_A_Token, after_B_Token].some(isNaN)) {
                throw new Error("❌ ERROR! One or more token values are invalid or not numeric.");
            }

            console.log("🔹 Token Before Swap | A:", before_A_Token, "| B:", before_B_Token);
            console.log("🔹 Token After Swap  | A:", after_A_Token, "| B:", after_B_Token);

            if (after_A_Token === before_A_Token && after_B_Token === before_B_Token) {
                console.log("✅ Swap Rejected as expected! Tokens remain unchanged.");
                return true;  
            } else {
                console.error("❌ ERROR! Tokens changed despite swap rejection.");
                console.error("🔍 Details - Before: { A:", before_A_Token, ", B:", before_B_Token, 
                            "} | After: { A:", after_A_Token, ", B:", after_B_Token, "}");
                throw new Error("❌ ERROR! Tokens changed despite swap rejection");  
            }
        };

        return invalidateRejectedSwap();
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Compare_Token_Before_And_After_Wrap() {
        await this.waitForTimeout(5000);

        if (!this.totalTokenBefore || !this.totalTokenAfter || !this.tokenSwapPage) {
            throw new Error("❌ ERROR! Missing token data before or after swap.");
        }

        const { pointA: Actual_Total_Token_Before_A, pointB: Actual_Total_Token_Before_B } = this.totalTokenBefore;
        const { pointA: Actual_Total_Token_After_A, pointB: Actual_Total_Token_After_B } = this.totalTokenAfter;
        const { newFromValue: Actual_Token_Before_Swap_A, newToValue: Actual_Token_Before_Swap_B } = this.tokenSwapPage;

        await this.waitForTimeout(5000);

        console.log(`🔹 Total_Token_Before_A: ${Actual_Total_Token_Before_A}, 🔹 Total_Token_After_A: ${Actual_Total_Token_After_A}`);
        console.log(`🔹 Total_Token_Before_B: ${Actual_Total_Token_Before_B}, 🔹 Total_Token_After_B: ${Actual_Total_Token_After_B}`);

        const parseAndValidate = (value, name) => {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0) {
                throw new Error(`❌ ERROR! Invalid value for ${name}: ${value}`);
            }
            return parseFloat(num.toFixed(5));
        };

        const Token_After_Swap_A_Number = parseAndValidate(Actual_Token_Before_Swap_A, "Token_After_Swap_A");
        const Token_After_Swap_B_Number = parseAndValidate(Actual_Token_Before_Swap_B, "Token_After_Swap_B");

        const expected_Total_Token_After_A = parseFloat((Actual_Total_Token_Before_A - Token_After_Swap_A_Number).toFixed(5));
        const expected_Total_Token_After_B = parseFloat((Actual_Total_Token_Before_B + Token_After_Swap_B_Number).toFixed(5));

        if (expected_Total_Token_After_A < 0) {
            throw new Error("❌ ERROR! Expected Token A after wrap is negative.");
        }

        const actual_Total_Token_After_A = parseFloat(Actual_Total_Token_After_A);
        const actual_Total_Token_After_B = parseFloat(Actual_Total_Token_After_B);

        const isMatchA = actual_Total_Token_After_A === expected_Total_Token_After_A;
        const isMatchB = actual_Total_Token_After_B === expected_Total_Token_After_B;

        if (isMatchA && isMatchB) {
            console.log("✅ Wrap Successful!", {
                Actual_Total_Token_After_A,
                expected_Total_Token_After_A,
                Actual_Total_Token_After_B,
                expected_Total_Token_After_B
            });
            return true;
        } else {
            console.error("❌ ERROR! Wrap validation failed", {
                Actual_Total_Token_After_A,
                expected_Total_Token_After_A,
                Difference_A: Math.abs(actual_Total_Token_After_A - expected_Total_Token_After_A),
                Actual_Total_Token_After_B,
                expected_Total_Token_After_B,
                Difference_B: Math.abs(actual_Total_Token_After_B - expected_Total_Token_After_B)
            });
            throw new Error("❌ ERROR! Wrap validation failed. Check logs for details.");
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Compare token values on swap page and confirm swap page
    async Compare_Swap_And_Confirm_Swap_Page() {
        // await this.page.waitForTimeout(3000);
    
        // const { newFromValue, newToValue, priceImpact: swapPriceImpact } = this.tokenSwapPage;
        // const { formattedInput, formattedOutput, Price_Impact: confirmPriceImpact } = this.tokenConfirmSwapPage;
        
        // const formatValue = (value, decimals) => parseFloat(value).toFixed(decimals);
        
        // const [swapInput, swapOutput] = [formatValue(newFromValue, 3), formatValue(newToValue, 3)];
        // const [confirmInput, confirmOutput] = [formatValue(formattedInput, 3), formatValue(formattedOutput, 3)];
        
        // const matchTokens = swapInput === confirmInput && swapOutput === confirmOutput;
        // const matchPriceImpact = swapPriceImpact === confirmPriceImpact;
    
        // console[matchTokens ? "log" : "error"](
        //     matchTokens
        //         ? `✅ Tokens match!🔹  Input: Swap (${swapInput}) | Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) | Confirm Swap (${confirmOutput})`
        //         : `❌ ERROR! Mismatch detected!🔹  Input: Swap (${swapInput}) | Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) | Confirm Swap (${confirmOutput})`
        // );
    
        // console[matchPriceImpact ? "log" : "error"](
        //     matchPriceImpact
        //         ? `✅ Price Impact matches!🔹 Swap: (${swapPriceImpact}) | Confirm Swap: (${confirmPriceImpact})`
        //         : `❌ ERROR! Mismatch in Price Impact!🔹 Swap: (${swapPriceImpact}) | Confirm Swap: (${confirmPriceImpact})`
        // );
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Get_Token_All_Web() {
        try {
            const balanceSelector_AIOZ_top = "div.css-vurnku";
            const balanceSelector_AIOZ_swap = "[data-testid='balance-text'] p:nth-of-type(2)";

            await Promise.all([
                this.page.waitForSelector(balanceSelector_AIOZ_top, { timeout: 20000 }),
                this.page.waitForSelector(balanceSelector_AIOZ_swap, { timeout: 20000 }),
            ]);

            const AIOZ_Top = await this.page.locator(balanceSelector_AIOZ_top).textContent();
            const AIOZ_Swap = await this.page.locator(balanceSelector_AIOZ_swap).nth(1).textContent();

            if (!AIOZ_Top || !AIOZ_Swap) {
                console.log("⚠ Failed to get AIOZ balance.");
            } else if (AIOZ_Top.trim() === AIOZ_Swap.trim()) {
                console.log(`✅ 🔹 AIOZ Top: ${AIOZ_Top} | 🔹 AIOZ Swap: ${AIOZ_Swap}`);
            } else {
                console.log(`❌ 🔹 AIOZ Top: ${AIOZ_Top} | 🔹 AIOZ Swap: ${AIOZ_Swap}`);
            }

            return { AIOZ_Top, AIOZ_Swap };

        } catch (error) {
            console.error("❌ Error retrieving points:", error.message);
            throw error;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
