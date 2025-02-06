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

            console.log(`🔹 Current Token From on Swap: ${formattedPointA}`);
            console.log(`🔹 Current Token To on Swap: ${formattedPointB}`);
 
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
    
        return { newFromValue, newToValue }; // 🔥 Trả về giá trị để sử dụng trong comparePoints()
    }
    
      
      
    async PointsBefore_ConfirmSwap() {
        try {
            await this.page.waitForTimeout(2000);
    
            const inputPoint = await this.page.locator("[data-testid='INPUT-amount']").innerText();
            const outputPoint = await this.page.locator("[data-testid='OUTPUT-amount']").innerText();

            const formattedInputPoint = inputPoint.trim(); 
            const formattedOutputPoint = outputPoint.trim(); 

            console.log(`🔹 Input Point on Confirm Swap: ${formattedInputPoint}`);
            console.log(`🔹 Output Point on Confirm Swap: ${formattedOutputPoint}`);

            return { formattedInputPoint, formattedOutputPoint };
        } catch (error) {
            console.error('❌ Error in PointsBefore_ConfirmSwap:', error);
            throw error;
        }
    }

    async comparePoints() {
        const { newFromValue, newToValue } = await this.Token_Swap();
        const { formattedInputPoint, formattedOutputPoint } = await this.PointsBefore_ConfirmSwap();
    
        const roundedNewFromValue = parseFloat(newFromValue).toFixed(2); // Làm tròn 2 chữ số
        const roundedNewToValue = parseFloat(newToValue).toFixed(5); // Làm tròn 5 chữ số
    
        const roundedInputPoint = parseFloat(formattedInputPoint).toFixed(2);
        const roundedOutputPoint = parseFloat(formattedOutputPoint).toFixed(5);
    
        console.log("🔄 So sánh điểm trước và sau khi Confirm Swap...");
    
        if (roundedNewFromValue === roundedInputPoint && roundedNewToValue === roundedOutputPoint) {
            console.log("✅ Điểm khớp nhau: Input & Output khi Swap và Confirm Swap đều giống nhau!");
        } else {
            console.error("❌ LỖI! Điểm không khớp giữa Swap và Confirm Swap!");
            console.error(`🔹 Input Point on Swap: ${roundedNewFromValue} | Confirm Swap: ${roundedInputPoint}`);
            console.error(`🔹 Output Point on Swap: ${roundedNewToValue} | Confirm Swap: ${roundedOutputPoint}`);
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

    // Phương thức waitForAndClickSwapButton sửa lại
    async waitForAndClickSwapButton() {
        try {
            // Chờ nút 'Swap' xuất hiện và không còn disabled
            const swapButtonLocator = this.page.locator("[data-testid='swap-button']");
            
            // Chờ cho đến khi nút không còn thuộc tính 'disabled'
            await this.page.waitForFunction(
                async (locator) => {
                    const disabled = await locator.getAttribute('disabled');
                    return !disabled;
                },
                swapButtonLocator
            );
    
            // Click vào nút khi nó không còn disabled
            await swapButtonLocator.click();
            console.log('🔹 Đã click vào nút Swap!');
        } catch (error) {
            console.error('❌ Lỗi khi chờ và click nút Swap:', error);
            throw error;
        }
    }
}
