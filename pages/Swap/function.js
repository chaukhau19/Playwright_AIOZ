import { expect } from "@playwright/test";
import { config } from "./../../data/AIOZ_config.js";

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async gotoURL() {
        await this.page.waitForTimeout(5000);
        await this.page.goto(config.URL, { waitUntil: "domcontentloaded", timeout: 90000 });
        await this.page.reload();
    }

    async Confirm_Swap() {
        await this.page.getByTestId('confirm-swap-button').click();
    }

    async Connect_Wallet_MetaMask() {
        await this.page.waitForTimeout(500);
        await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("//div[contains(text(), 'MetaMask')]").click();
    }

    async Connect_Wallet_CoinBase() {
        await this.page.waitForTimeout(500);
        await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
        await this.page.locator("//img[@alt='Close' or @title='Close']").click();
        await this.page.reload();
        await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
        await this.page.waitForTimeout(500);
        await this.page.locator("//div[contains(text(), 'Coinbase Wallet')]").click();
    }

    async Disconnect_Wallet_MetaMask() {
        await this.page.locator("//button[@data-testid='web3-status-connected']").click();
        await this.page.waitForTimeout(500);
        await this.page.locator("//button[.//img[@title='Disconnect']]").click();
        await this.page.waitForTimeout(500);
    }
    
    async Disconnect_Wallet_CoinBase() {
        await this.page.locator("//button[@data-testid='web3-status-connected']").click();
        await this.page.waitForTimeout(500);
        await this.page.locator("//button[.//img[@title='Disconnect']]").click();
        await this.page.waitForTimeout(500);
    }
    async Verify_Account_MetaMask_Connected() {
        await this.page.locator("//img[@alt='Close' or @title='Close']").click();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator(config.Expected_Account_MetaMask_Connected)).toBeVisible();
        await this.page.waitForTimeout(500);
    }

    async Verify_Account_MetaMask_Disconnected() {
        await this.page.waitForTimeout(500);
        await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        await this.page.waitForTimeout(500);
    }
    
    async Verify_Account_CoinBase_Connected() {
        await this.page.locator("//img[@alt='Close' or @title='Close']").click();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator(config.Expected_Account_CoinBase_Connected)).toBeVisible();
        await this.page.waitForTimeout(500);
    }

    async Verify_Account_CoinBase_Disconnected() {
        await this.page.waitForTimeout(500);
        await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
        await this.page.waitForTimeout(500);
    }

    async Fill_Amount_A(amount) {
        await this.page.getByPlaceholder('0.0').first().fill(amount);
        await this.page.waitForTimeout(20000);
    }

    async Fill_Amount_B(amount) {
        await this.page.getByPlaceholder('0.0').eth(1).fill(amount);
        await this.page.waitForTimeout(20000);
    }
    
    async Fill_Amount_Half_A() {
        await this.page.locator("(//button[contains(text(), 'Half')])[1]").click();
        await this.page.waitForTimeout(20000);
    }

    async Fill_Amount_Half_B() {
        await this.page.locator("(//button[contains(text(), 'Half')])[2]").click();
        await this.page.waitForTimeout(20000);
    }

    async Fill_Amount_Max_A() {
        await this.page.locator("(//button[contains(text(), 'Max')])[1]").click();
        await this.page.waitForTimeout(20000);
    }

    async Fill_Amount_Max_B() {
        await this.page.locator("(//button[contains(text(), 'Max')])[2]").click();
        await this.page.waitForTimeout(20000);
    }

    async Token_Redemption() {
        await this.page.waitForTimeout(500);
        await this.page.locator("//div[@data-testid='swap-currency-button']").click();
        await this.page.waitForTimeout(500);
    }
    
    async Swap_Tokens() {
        await this.page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator('[data-testid="swap-button"]').click());
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Total_Token_Before() {
        try {
            await this.page.waitForTimeout(5000);

            const balanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";
            await this.page.waitForSelector(balanceSelector, { timeout: 5000 });
            await this.page.waitForTimeout(5000);
            
            const pointsTextArray = await this.page.locator(balanceSelector).allInnerTexts();
            if (pointsTextArray.length < 2) throw new Error("No two remainder values found.");

            const [rawTextA, rawTextB] = pointsTextArray;
            const [pointA, pointB] = [this.convertToPoints(rawTextA), this.convertToPoints(rawTextB)];

            this.totalTokenBefore = { pointA, pointB, rawTextA, rawTextB };

            return this.totalTokenBefore;
        } catch (error) {
            console.error('❌ Error retrieving points:', error);
            throw error;
        }
    }

    async Total_Token_After() {
        try {
            await this.page.waitForTimeout(10000);

            const balanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";
            await this.page.waitForSelector(balanceSelector, { timeout: 5000 });
            await this.page.waitForTimeout(5000);

            const pointsTextArray = await this.page.locator(balanceSelector).allInnerTexts();
            if (pointsTextArray.length < 2) throw new Error("No two remainder values found.");

            const [rawTextA, rawTextB] = pointsTextArray;
            const [pointA, pointB] = [this.convertToPoints(rawTextA), this.convertToPoints(rawTextB)];

            this.totalTokenAfter = { pointA, pointB, rawTextA, rawTextB };

            return this.totalTokenAfter;
        } catch (error) {
            console.error('❌ Error retrieving points:', error);
            throw error;
        }
    }
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Token_Swap_Page() {
        await this.page.waitForSelector('input.token-amount-input', { timeout: 5000 });

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

        this.tokenSwapPage = { 
            newFromValue: Token_Before_Swap_A, 
            newToValue: Token_Before_Swap_B,
            fiatFromValue: Value_Before_Swap_A, 
            fiatToValue: Value_Before_Swap_B 
        };

        return this.tokenSwapPage;
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Confirm token values after swap
    async Token_Confirm_Swap_Page() {
        try {
            await this.page.waitForTimeout(2000);
    
            const inputPoint = await this.page.locator("[data-testid='INPUT-amount']").innerText();
            const outputPoint = await this.page.locator("[data-testid='OUTPUT-amount']").innerText();
    
            const formattedInput = inputPoint.trim();
            const formattedOutput = outputPoint.trim();
    
            this.tokenConfirmSwapPage = { formattedInput, formattedOutput };
    
            return this.tokenConfirmSwapPage;
        } catch (error) {
            console.error('❌ Error in confirmTokenSwap:', error);
            throw error;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Compare token values on swap page and confirm swap page
    async Compare_On_Swap_And_Confirm_Swap_Page() {
        const { newFromValue, newToValue } = this.tokenSwapPage;
        const { formattedInput, formattedOutput } = this.tokenConfirmSwapPage;
    
        const formatValue = (value, decimals) => parseFloat(value).toFixed(decimals);
    
        const [swapInput, swapOutput] = [formatValue(newFromValue, 5), formatValue(newToValue, 5)];
        const [confirmInput, confirmOutput] = [formatValue(formattedInput, 5), formatValue(formattedOutput, 5)];
    
        const match = swapInput === confirmInput && swapOutput === confirmOutput;
    
        console[match ? "log" : "error"](
            match
                ? `✅ No discrepancy: Tokens match!  
                🔹  Input: Swap (${swapInput}) = Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) = Confirm Swap (${confirmOutput})`
                : `❌ ERROR! Mismatch detected!  
                🔹  Input: Swap (${swapInput}) | Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) | Confirm Swap (${confirmOutput})`
        );
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Get_Token_All_Web() {
        try {
            const balanceSelector_AIOZ_top = "div.css-vurnku";
            const balanceSelector_AIOZ_swap = "[data-testid='balance-text'] p:nth-of-type(2)";

            await Promise.all([
                this.page.waitForSelector(balanceSelector_AIOZ_top, { timeout: 5000 }),
                this.page.waitForSelector(balanceSelector_AIOZ_swap, { timeout: 5000 }),
            ]);

            const AIOZ_Top = await this.page.locator(balanceSelector_AIOZ_top).textContent();
            const AIOZ_Swap = await this.page.locator(balanceSelector_AIOZ_swap).nth(1).textContent();

            if (!AIOZ_Top || !AIOZ_Swap) {
                console.log("⚠ Failed to get AIOZ balance.");
            } else if (AIOZ_Top.trim() === AIOZ_Swap.trim()) {
                console.log("✅ 🔹 AIOZ Top: ${AIOZ_Top} | 🔹 AIOZ Swap: ${AIOZ_Swap}");
            } else {
                console.log("❌ 🔹 AIOZ Top: ${AIOZ_Top} | 🔹 AIOZ Swap: ${AIOZ_Swap}");
            }

            return { AIOZ_Top, AIOZ_Swap };

        } catch (error) {
            console.error("❌ Error retrieving points:", error);
            throw error;
        }
    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async Compare_Token_Before_And_After_Swap(priceImpact = 0.0005, slippageTolerance = 0.005, networkCostA = 0.01) {
    await this.waitForTimeout(5000);

    const { pointA: Total_Token_Before_A, pointB: Total_Token_Before_B } = this.totalTokenBefore;
    const { pointA: actual_Total_Token_After_A, pointB: actual_Total_Token_After_B } = this.totalTokenAfter;
    const { newFromValue: Token_Before_Swap_A, newToValue: Token_Before_Swap_B } = this.tokenSwapPage;

    await this.waitForTimeout(5000);

    console.log(`🔹 Total_Token_Before_A: ${Total_Token_Before_A}, 🔹 Total_Token_After_A: ${actual_Total_Token_After_A}`);
    console.log(`🔹 Total_Token_Before_B: ${Total_Token_Before_B}, 🔹 Total_Token_After_B: ${actual_Total_Token_After_B}`);

    const Token_After_Swap_A = parseFloat(Token_Before_Swap_A).toFixed(5);
    const Token_After_Swap_A_Number = parseFloat(Token_After_Swap_A);

    const Token_After_Swap_B = parseFloat(Token_Before_Swap_B).toFixed(5);
    const Token_After_Swap_B_Number = parseFloat(Token_After_Swap_B);

    const validateInput = (value, name) => {
        if (isNaN(value) || value < 0) {
            throw new Error(`❌ ERROR! Invalid input for ${name}. Value: ${value}`);
        }
        return true;
    };

    const calculateAndValidateExpectedValues = () => {
        validateInput(Total_Token_Before_A, "Total_Token_Before_A");
        validateInput(Token_After_Swap_A_Number, "Token_After_Swap_A_Number");
        validateInput(Total_Token_Before_B, "Total_Token_Before_B");
        validateInput(Token_After_Swap_B_Number, "Token_After_Swap_B_Number");

        const expected_Total_Token_After_A = parseFloat(
            (parseFloat(Total_Token_Before_A) - Token_After_Swap_A_Number - networkCostA).toFixed(2)
        );
        const expected_Total_Token_After_B = parseFloat(
            (parseFloat(Total_Token_Before_B) + Token_After_Swap_B_Number).toFixed(2)
        );

        if (expected_Total_Token_After_A < 0) {
            throw new Error("❌ ERROR! Expected Token A after swap is negative.");
        }

        return { expected_Total_Token_After_A, expected_Total_Token_After_B };
    };

    const isWithinRange = (actual, expected, tolerance, impact = 0, slippage = 0) => {
        if (tolerance) {
            return Math.abs(actual - expected) <= tolerance;
        } else { 
            const acceptableLow = expected * (1 - impact - slippage);
            const acceptableHigh = expected * (1 + impact + slippage);
            return actual >= acceptableLow && actual <= acceptableHigh;
        }
    };

    const validateSuccessfulSwap = () => {
        const { expected_Total_Token_After_A, expected_Total_Token_After_B } = calculateAndValidateExpectedValues();

        const actual_A_Number = parseFloat(actual_Total_Token_After_A);
        const actual_B_Number = parseFloat(actual_Total_Token_After_B);

        const passA = isWithinRange(actual_A_Number, expected_Total_Token_After_A, networkCostA);
        const passB = isWithinRange(actual_B_Number, expected_Total_Token_After_B, null, priceImpact, slippageTolerance);

        if (passA && passB) {
            console.log("✅ Swap Successful!", {
                Total_Token_After_A: actual_Total_Token_After_A,
                expected_Total_Token_After_A: expected_Total_Token_After_A,
                Total_Token_After_B: actual_Total_Token_After_B,
                expected_Total_Token_After_B: expected_Total_Token_After_B
            });
            return true;
        } else {
            throw new Error("❌ ERROR! Swap validation failed", {
                Total_Token_After_A: actual_Total_Token_After_A,
                expected_Total_Token_After_A: expected_Total_Token_After_A,
                Difference_A: Math.abs(actual_A_Number - expected_Total_Token_After_A),
                Total_Token_After_B: actual_Total_Token_After_B,
                expected_Total_Token_After_B: expected_Total_Token_After_B,
                Difference_B: Math.abs(actual_B_Number - expected_Total_Token_After_B)
            });
        }
    };

    return validateSuccessfulSwap();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
