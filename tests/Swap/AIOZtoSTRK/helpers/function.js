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
    async Total_Token_Before() {
        try {
            await this.page.waitForTimeout(5000);

            const balanceSelector = "[data-testid='balance-text'] p:nth-of-type(2)";
            await this.page.waitForSelector(balanceSelector, { timeout: 5000 });

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
        await this.page.waitForSelector('input.NumericalInput__StyledInput-sc-43d180ea-0', { timeout: 5000 });

        const [inputFrom, inputTo] = await this.page.locator('input.NumericalInput__StyledInput-sc-43d180ea-0').all();
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

        const [fiatFromElement, fiatToElement] = await this.page.locator('//div[contains(@class, "SwapCurrencyInputPanel__FiatText-sc")]').all();
        const [Value_Before_Swap_A, Value_Before_Swap_B] = await Promise.all([
            fiatFromElement.innerText(),
            fiatToElement.innerText()
        ]);

        this.tokenSwapPage = { newFromValue: Token_Before_Swap_A, newToValue: Token_Before_Swap_B };

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
                ? `✅ No discrepancy: Tokens match!  🔹  Input: Swap (${swapInput}) = Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) = Confirm Swap (${confirmOutput})`
                : `❌ ERROR! Mismatch detected!  🔹  Input: Swap (${swapInput}) | Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) | Confirm Swap (${confirmOutput})`
        );
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Compare_Token_Before_And_After_Swap() {
        await this.page.waitForTimeout(3000);

        const { pointA: Total_Token_Before_A, pointB: Total_Token_Before_B } = this.totalTokenBefore;
        const { pointA: Total_Token_After_A, pointB: Total_Token_After_B } = this.totalTokenAfter;
        const { newFromValue: Token_Before_Swap_A, newToValue: Token_Before_Swap_B } = this.tokenSwapPage;

        console.log(`  🔹  Total_Token_Before_A: ${Total_Token_Before_A},  🔹  Total_Token_After_A: ${Total_Token_After_A}`);
        console.log(`  🔹  Total_Token_Before_B: ${Total_Token_Before_B},  🔹  Total_Token_After_B: ${Total_Token_After_B}`);
        console.log(`  🔹  Swap Use (Input Token): ${Token_Before_Swap_A},  🔹  Swap Use (Output Token): ${Token_Before_Swap_B}`);

        const [price_impact, slippage_tolerance, network_cost] = [0.0005, 0.005, 0.001];

        const Token_After_Swap_A = parseFloat(Token_Before_Swap_A).toFixed(5);
        const expected_Total_Token_After_A = parseFloat(Total_Token_Before_A - Token_After_Swap_A - price_impact).toFixed(5);

        const Token_After_Swap_B = parseFloat(Token_Before_Swap_B * (1 - slippage_tolerance)).toFixed(5);
        const expected_Total_Token_After_B = parseFloat(Total_Token_Before_B + Token_After_Swap_B).toFixed(5);

        const isWithinRange = (actual, expected) => Math.abs(actual - expected) <= network_cost;

        const pass_A = isWithinRange(Total_Token_After_A, expected_Total_Token_After_A);
        const pass_B = isWithinRange(Total_Token_After_B, expected_Total_Token_After_B);

        if (pass_A && pass_B) {
            console.log("✅ Swap Successful: The token value after the swap is as predicted!",
            {
                Total_Token_After_A, expected_Total_Token_After_A,
                Total_Token_After_B, expected_Total_Token_After_B
            })
        } else {
            console.error("❌ ERROR! The result after Swap did not match expectations.", 
            {
                Total_Token_After_A, expected_Total_Token_After_A,
                Total_Token_After_B, expected_Total_Token_After_B
            });
        }

        return pass_A && pass_B;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
