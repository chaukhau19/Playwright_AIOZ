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
                ? `✅ No discrepancy: Tokens match!  
                🔹  Input: Swap (${swapInput}) = Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) = Confirm Swap (${confirmOutput})`
                : `❌ ERROR! Mismatch detected!  
                🔹  Input: Swap (${swapInput}) | Confirm Swap (${confirmInput}),  🔹  Output: Swap (${swapOutput}) | Confirm Swap (${confirmOutput})`
        );
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // async Compare_Token_Before_And_After_Swap() {
    //     await this.page.waitForTimeout(3000);

    //     const { pointA: Total_Token_Before_A, pointB: Total_Token_Before_B } = this.totalTokenBefore;
    //     const { pointA: actual_Total_Token_After_A, pointB: actual_Total_Token_After_B } = this.totalTokenAfter;
    //     const { newFromValue: Token_Before_Swap_A, newToValue: Token_Before_Swap_B } = this.tokenSwapPage;

    //     await this.page.waitForTimeout(5000);
    //     console.log(`  🔹  Total_Token_Before_A: ${Total_Token_Before_A},  🔹  Total_Token_After_A: ${actual_Total_Token_After_A}`);
    //     console.log(`  🔹  Total_Token_Before_B: ${Total_Token_Before_B},  🔹  Total_Token_After_B: ${actual_Total_Token_After_B}`);
    //     // console.log(`  🔹  Swap Use (Input Token): ${Token_Before_Swap_A},  🔹  Swap Use (Output Token): ${Token_Before_Swap_B}`);

    //     const [price_impact, slippage_tolerance, network_cost] = [0.0005, 0.005, 0.01];

    //     const Token_After_Swap_A = parseFloat(Token_Before_Swap_A).toFixed(5);
    //     // console.log(`  🔹  Token_Before_Swap_A: ${Token_Before_Swap_A},  🔹  Token_After_Swap_A: ${Token_After_Swap_A}`);
        
    //     const expected_Total_Token_After_A = parseFloat((Total_Token_Before_A - Token_After_Swap_A - network_cost).toFixed(2));
    //     // console.log(`  🔹  Expected Total_Token_After_A: ${expected_Total_Token_After_A}`);

    //     const Token_After_Swap_B = parseFloat(Token_Before_Swap_B).toFixed(5);
    //     // console.log(`  🔹  Token_Before_Swap_B: ${Token_Before_Swap_B},  🔹  Token_After_Swap_B: ${Token_After_Swap_B}`);
        
    //     const expected_Total_Token_After_B = parseFloat((Total_Token_Before_B + parseFloat(Token_After_Swap_B)).toFixed(2));
    //     // console.log(`  🔹  Expected Total_Token_After_B: ${expected_Total_Token_After_B}`);

    //     const isWithinRange = (actual, expected) => Math.abs(actual - expected) <= network_cost;

    //     const pass_A = isWithinRange(actual_Total_Token_After_A, expected_Total_Token_After_A);
    //     const pass_B = isWithinRange(actual_Total_Token_After_B, expected_Total_Token_After_B);
        
    //     await this.page.waitForTimeout(5000);
    //     if (pass_A && pass_B) {
    //         console.log("✅ Swap Successful!",
    //         {
    //             Total_Token_After_A: actual_Total_Token_After_A, expected_Total_Token_After_A,
    //             Total_Token_After_B: actual_Total_Token_After_B, expected_Total_Token_After_B
    //         });
    //     } else {
    //         console.error("❌ ERROR!", 
    //         {
    //             Total_Token_After_A: actual_Total_Token_After_A,
    //             expected_Total_Token_After_A: expected_Total_Token_After_A,
    //             Difference_A: Math.abs(parseFloat(actual_Total_Token_After_A) - expected_Total_Token_After_A),
    //             Total_Token_After_B: actual_Total_Token_After_B,
    //             expected_Total_Token_After_B: expected_Total_Token_After_B,
    //             Difference_B: Math.abs(parseFloat(actual_Total_Token_After_B) - expected_Total_Token_After_B)
    //         });
    //     }

    //     return pass_A && pass_B;
    // }

    async Compare_Token_Before_And_After_Swap() {
    
        await this.waitForTimeout(3000);

        const { pointA: Total_Token_Before_A, pointB: Total_Token_Before_B } = this.totalTokenBefore;
        const { pointA: actual_Total_Token_After_A, pointB: actual_Total_Token_After_B } = this.totalTokenAfter;
        const { newFromValue: Token_Before_Swap_A, newToValue: Token_Before_Swap_B } = this.tokenSwapPage;
    
        await this.waitForTimeout(5000);
    
        console.log(`🔹 Total_Token_Before_A: ${Total_Token_Before_A}, 🔹 Total_Token_After_A: ${actual_Total_Token_After_A}`);
        console.log(`🔹 Total_Token_Before_B: ${Total_Token_Before_B}, 🔹 Total_Token_After_B: ${actual_Total_Token_After_B}`);
    
        const price_impact = 0.0005;          // 0.05%
        const slippage_tolerance = 0.005;     // 0.5%
        const network_cost_A = 0.01;          // 0.01 
    
        const Token_After_Swap_A = parseFloat(Token_Before_Swap_A).toFixed(5);
        const Token_After_Swap_A_Number = parseFloat(Token_After_Swap_A);  
    
        // Kiểm tra định dạng số và không âm
        if (isNaN(Total_Token_Before_A) || isNaN(Token_After_Swap_A_Number)) {
            console.error("❌ ERROR! Token A values are not valid numbers.");
            return false;
        }
    
        const expected_Total_Token_After_A = parseFloat(
            (parseFloat(Total_Token_Before_A) - Token_After_Swap_A_Number - network_cost_A).toFixed(2)
        );
    
        const Token_After_Swap_B = parseFloat(Token_Before_Swap_B).toFixed(5); 
        const Token_After_Swap_B_Number = parseFloat(Token_After_Swap_B);     
    
        if (isNaN(Token_After_Swap_B_Number)) {
            console.error("❌ ERROR! Token B swap value is not a valid number.");
            return false;
        }
    
        const expected_Total_Token_After_B = parseFloat(
            (parseFloat(Total_Token_Before_B) + Token_After_Swap_B_Number).toFixed(2)
        );
    
        // Kiểm tra điều kiện không âm
        if (expected_Total_Token_After_A < 0) {
            console.error("❌ ERROR! Expected Token A after swap is negative.");
            return false;
        }
    
        // Hàm kiểm tra phạm vi chấp nhận cho Token A và Token B
        const isWithinRange_A = (actual, expected, tolerance) => Math.abs(actual - expected) <= tolerance;
        const isWithinRange_B = (actual, expected, impact, slippage) => {
            const acceptable_low = expected * (1 - impact - slippage);
            const acceptable_high = expected * (1 + impact + slippage);
            return actual >= acceptable_low && actual <= acceptable_high;
        };
    
        // Kiểm tra Token A với network_cost_A
        const actual_A_Number = parseFloat(actual_Total_Token_After_A);
        const pass_A = isWithinRange_A(actual_A_Number, expected_Total_Token_After_A, network_cost_A);
    
        // Kiểm tra Token B với price_impact và slippage_tolerance
        const actual_B_Number = parseFloat(actual_Total_Token_After_B);
        const pass_B = isWithinRange_B(actual_B_Number, expected_Total_Token_After_B, price_impact, slippage_tolerance);
    
        await this.waitForTimeout(5000);
    
        if (pass_A && pass_B) {
            console.log("✅ Swap Successful!", {
                Total_Token_After_A: actual_Total_Token_After_A,
                expected_Total_Token_After_A: expected_Total_Token_After_A,
                Total_Token_After_B: actual_Total_Token_After_B,
                expected_Total_Token_After_B: expected_Total_Token_After_B
            });
        } else {
            console.error("❌ ERROR!", {
                Total_Token_After_A: actual_Total_Token_After_A,
                expected_Total_Token_After_A: expected_Total_Token_After_A,
                Difference_A: Math.abs(actual_A_Number - expected_Total_Token_After_A),
                Total_Token_After_B: actual_Total_Token_After_B,
                expected_Total_Token_After_B: expected_Total_Token_After_B,
                Difference_B: Math.abs(actual_B_Number - expected_Total_Token_After_B)
            });
        }
    
        return pass_A && pass_B;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
