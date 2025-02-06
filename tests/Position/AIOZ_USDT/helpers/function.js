export class FunctionPage {
    constructor(page) {  
        this.page = page;
    }

    convertToPoints(text) {
        if (text.indexOf('.') !== -1) {
            return parseFloat(text.replace(/,/g, ""));
        } else if (text.indexOf(',') !== -1) {
            return parseFloat(text.replace(",", "."));
        } else {
            return parseFloat(text);
        }
    }

    async Total_Token_Before_Swap() {
        try {
            await this.page.waitForTimeout(2000);
    
            await this.page.waitForSelector("[data-testid='balance-text'] p:nth-of-type(2)", { timeout: 5000 });
            const pointsTextArray = await this.page.locator("[data-testid='balance-text'] p:nth-of-type(2)").allInnerTexts();
    
            if (pointsTextArray.length < 2) {
                throw new Error("No two remainder values ​​found.");
            }
    
            const rawTextA = pointsTextArray[0];
            const rawTextB = pointsTextArray[1];
    
            const pointA = this.convertToPoints(rawTextA);
            const pointB = this.convertToPoints(rawTextB);

            const formattedPointA = new Intl.NumberFormat('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            }).format(pointA);
    
            const formattedPointB = new Intl.NumberFormat('de-DE', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            }).format(pointB);

            console.log(`🔹 Total Token_Current From Suply: ${formattedPointA}`);
            console.log(`🔹 Total Token_Current To on Suply: ${formattedPointB}`);
 
            return { pointA, pointB, rawTextA, rawTextB };
        } catch (error) {
            console.error('❌ Error retrieving points:', error);
            throw error;
        }
    }




    async Token_Swap() {
        await this.page.waitForSelector('input.NumericalInput__StyledInput-sc-43d180ea-0', { timeout: 5000 });
    
        const inputFrom = await this.page.locator('input.NumericalInput__StyledInput-sc-43d180ea-0').nth(0);
        const inputTo = await this.page.locator('input.NumericalInput__StyledInput-sc-43d180ea-0').nth(1);
    
        let initialFromValue = await inputFrom.getAttribute('value') || "";
        let initialToValue = await inputTo.getAttribute('value') || "";
    
        let newFromValue = initialFromValue;
        let newToValue = initialToValue;
    
        for (let i = 0; i < 20; i++) { 
            newFromValue = await inputFrom.getAttribute('value');
            newToValue = await inputTo.getAttribute('value');
    
            if (newFromValue !== initialFromValue && newToValue !== initialToValue) break;
            await this.page.waitForTimeout(500);
        }
    
        const fiatFromElement = await this.page.locator('//div[contains(@class, "SwapCurrencyInputPanel__FiatText-sc")]').nth(0);
        const fiatToElement = await this.page.locator('//div[contains(@class, "SwapCurrencyInputPanel__FiatText-sc")]').nth(1);
    
        let fiatFrom = await fiatFromElement.innerText();
        let fiatTo = await fiatToElement.innerText();
    
        console.log(`🔹 Current Token FROM: ${newFromValue}`);
        console.log(`🔹 Current Token TO: ${newToValue}`);
        console.log(`💰 Fiat Value FROM: ${fiatFrom}`);
        console.log(`💰 Fiat Value TO: ${fiatTo}`);
    
        return { newFromValue, newToValue };
    }
    
      
      
    async Token_Confirm_Swap() {
        try {
            await this.page.waitForTimeout(2000);
    
            const tokenValue = await this.page.locator('div[class="sc-aXZVg Row-sc-7200457f-0 Row__RowFixed-sc-7200457f-4 dKubqp ddKOTl jVfWIW"]')
            .locator('div.text__TextWrapper-sc-ff9b9e4c-0')  
            .innerText();

            const value = await this.page.locator('div.text__TextWrapper-sc-ff9b9e4c-0.dmYapV.css-bxr5rh').innerText();

            const formattedInput = tokenValue.trim(); 
            const formattedOutput = value.trim(); 

            console.log(`🔹 Current Token Value: ${tokenValue}`);
            console.log(`🔹 Current Value: ${value}`);

            return { formattedInput, formattedOutput };
        } catch (error) {
            console.error('❌ Error in Token_Confirm_Swap:', error);
            throw error;
        }
    }

    async compare_Token() {
        const { newFromValue, newToValue } = await this.Token_Swap();
        const { formattedInput, formattedOutput } = await this.Token_Confirm_Swap();
    
        const roundedNewFromValue = parseFloat(newFromValue).toFixed(2); 
        const roundedNewToValue = parseFloat(newToValue).toFixed(5); 
    
        const roundedInput = parseFloat(formattedInput).toFixed(2);
        const roundedOutput = parseFloat(formattedOutput).toFixed(5);
    
        if (roundedNewFromValue === roundedInput && roundedNewToValue === roundedOutput) {
            console.log("✅ Difference: Input and Output when Swap and Confirm Swap are the same!");
        } else {
            console.error("❌ ERROR! Mismatch between Swap and Confirm Swap!");
            console.error(`🔹 Input Point on Swap: ${roundedNewFromValue} | Confirm Swap: ${roundedInput}`);
            console.error(`🔹 Output Point on Swap: ${roundedNewToValue} | Confirm Swap: ${roundedOutput}`);
        }
    }
    
    async PointsAfter_Swap(expectedDecrease, pointsBefore) {
        await this.page.waitForTimeout(2000);
        const pointsAfter = await this.getCurrentPoints();
        const pointAUsed = pointsBefore.pointA - pointsAfter.pointA;
        const pointBUsed = pointsBefore.pointB - pointsAfter.pointB;

        console.log('⚡⚡⚡ Total Points used after:');
        console.log(`   - PointA decreased by: ${pointAUsed}`);
        console.log(`   - PointB decreased by: ${pointBUsed}`);

        if (pointAUsed === expectedDecrease && pointBUsed === expectedDecrease) {
            console.log(`✅ Both points decreased by ${expectedDecrease} as expected.`);
        } else {
            console.error(`❌ Points mismatch. Expected decrease: ${expectedDecrease}, Actual decrease: PointA=${pointAUsed}, PointB=${pointBUsed}`);
        }

        return pointsAfter;
    }

}
