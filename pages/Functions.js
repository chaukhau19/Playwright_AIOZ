import { expect } from "@playwright/test";
import { swapconfig } from "../data/Swap_Config.js";
import { positionconfig } from "../data/Position_Config.js";
import { assetsconfig } from "../data/Assets_Config.js";
import { exploreconfig } from "../data/Explore_Config.js";
import { farmconfig } from "../data/Farm_Config.js";

export class FunctionPage {
    constructor(page) {
        this.page = page;
        this.testStatus = true;  
        this.errors = []; 
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Convert formatted number to float
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

    getLocator(identifier, type) {
        switch (type) {
            case "testId": return this.page.getByTestId(identifier);
            case "text": return this.page.getByText(identifier, { exact: true });
            case "placeholder": return this.page.getByPlaceholder(identifier);
            case "role": return this.page.getByRole('button', { name: identifier });
            case "xpath":
            default: return this.page.locator(identifier);
        }
    } 

    // Format number with commas
    convertToPointsWithCommas(number) {
        return Number(number).toLocaleString('en-US');
    }

    // Format number with fixed decimal places
    formatValue(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
    
    // Delay execution for a specific time
    async waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // selectDateTime
    async selectDateTime_Backup(startDateOffset = 0, endDateOffset = 0, startTimeOffset = 0, endTimeOffset = 0, useCalendar = false) {
        try {
            let now = new Date();
            let startDate = new Date(now);
            startDate.setDate(startDate.getDate() + startDateOffset);
            let endDate = new Date(now);
            endDate.setDate(endDate.getDate() + endDateOffset);
            let startTime = new Date(now);
            startTime.setHours(startTime.getHours() + startTimeOffset);
            let endTime = new Date(now);
            endTime.setHours(endTime.getHours() + endTimeOffset);
    
            let formattedStartDate = startDate.toISOString().split('T')[0];
            let formattedEndDate = endDate.toISOString().split('T')[0];
            let formattedStartTime = startTime.toTimeString().slice(0, 5);
            let formattedEndTime = endTime.toTimeString().slice(0, 5);
    
            if (useCalendar) {
                await this.page.click(farmconfig.Start_Date_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.Start_Date_Element, formattedStartDate);
    
                await this.page.click(farmconfig.End_Date_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.End_Date_Element, formattedEndDate);
    
                await this.page.click(farmconfig.Start_Time_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.Start_Time_Element, formattedStartTime);
    
                await this.page.click(farmconfig.End_Time_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.End_Time_Element, formattedEndTime);
            } else {
                await this.page.fill(farmconfig.Start_Date_Element, formattedStartDate);
                await this.page.fill(farmconfig.End_Date_Element, formattedEndDate);
                await this.page.fill(farmconfig.Start_Time_Element, formattedStartTime);
                await this.page.fill(farmconfig.End_Time_Element, formattedEndTime);
            }
        } catch (error) {
            // console.error(`Test case failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    
    // selectDateTime
    async selectDateTime(startDateOffset = { days: 0, months: 0, years: 0 }, 
        endDateOffset = { days: 0, months: 0, years: 0 }, 
        startTimeOffset = { hours: 0, minutes: 0 }, 
        endTimeOffset = { hours: 0, minutes: 0 }, 
        useCalendar = false) {
    
        try {
            let now = new Date();
    
            let startDate = new Date(now);
            startDate.setFullYear(startDate.getFullYear() + startDateOffset.years);
            startDate.setMonth(startDate.getMonth() + startDateOffset.months);
            startDate.setDate(startDate.getDate() + startDateOffset.days);
    
            let endDate = new Date(now);
            endDate.setFullYear(endDate.getFullYear() + endDateOffset.years);
            endDate.setMonth(endDate.getMonth() + endDateOffset.months);
            endDate.setDate(endDate.getDate() + endDateOffset.days);
    
            let startTime = new Date(now);
            startTime.setHours(startTime.getHours() + startTimeOffset.hours);
            startTime.setMinutes(startTime.getMinutes() + startTimeOffset.minutes);
    
            let endTime = new Date(now);
            endTime.setHours(endTime.getHours() + endTimeOffset.hours);
            endTime.setMinutes(endTime.getMinutes() + endTimeOffset.minutes);
    
            let formattedStartDate = startDate.toISOString().split('T')[0];
            let formattedEndDate = endDate.toISOString().split('T')[0];
            let formattedStartTime = startTime.toTimeString().slice(0, 5);
            let formattedEndTime = endTime.toTimeString().slice(0, 5);
    
            console.log(`Selecting Date & Time:
            Start Date: ${formattedStartDate}, End Date: ${formattedEndDate}
            Start Time: ${formattedStartTime}, End Time: ${formattedEndTime}`);
    
            if (useCalendar) {
                await this.page.click(farmconfig.Start_Date_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.Start_Date_Element, formattedStartDate);
    
                await this.page.click(farmconfig.End_Date_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.End_Date_Element, formattedEndDate);
    
                await this.page.click(farmconfig.Start_Time_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.Start_Time_Element, formattedStartTime);
    
                await this.page.click(farmconfig.End_Time_Element);
                await this.page.waitForTimeout(200);
                await this.page.fill(farmconfig.End_Time_Element, formattedEndTime);
            } else {
                await this.page.fill(farmconfig.Start_Date_Element, formattedStartDate);
                await this.page.fill(farmconfig.End_Date_Element, formattedEndDate);
                await this.page.fill(farmconfig.Start_Time_Element, formattedStartTime);
                await this.page.fill(farmconfig.End_Time_Element, formattedEndTime);
            }
    
        } catch (error) {
            // console.error(`Test case failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Timeout for each testcase
    async TimeoutTest(Function, wallet, timeout = 900000) {
        try {
            const testCasePromise = Function(wallet);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Test case timed out!")), timeout)
            );
            await Promise.race([testCasePromise, timeoutPromise]);

        } catch (error) {
            // console.error(`Test case failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Go to the page
    async gotoURL() {
        await this.page.waitForTimeout(5000);
        try {
            await this.page.goto(swapconfig.URL, { waitUntil: "domcontentloaded", timeout: 90000 });
            await this.page.reload();

        } catch (error) {
            // console.error(`Failed to load URL: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }  
    
    async isElementVisible(selector) {
        try {
            return await page.waitForSelector(selector, { timeout: 2000 }).then(() => true).catch(() => false);
        } catch (error) {
            return false;
        }
    }    

    // Wait until the button appears, then click
    async clickButton(identifier, name, type = "xpath", timeout = 50000) {
        try {   
            await this.page.waitForTimeout(1000);
            const locator = this.getLocator(identifier, type);
            await locator.waitFor({ state: 'visible', timeout });
            if (!(await locator.isEnabled())) {
                throw new Error(`'${name}' is disabled, cannot click.`);
            }
            await locator.click();
            // console.log(`Clicked '${name}' button successfully.`);

        } catch (error) {
            console.error(` Failed to click '${name}' button: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }   

    async fillInputField(identifier, value, type = "xpath", timeout = 50000) {
        try {
            const locator = this.getLocator(identifier, type);
            await locator.waitFor({ state: 'visible', timeout });
            await locator.fill(value);
            await this.page.waitForTimeout(500); 
            
            const enteredValue = await locator.inputValue();
            if (enteredValue !== value) {
                throw new Error(`Value mismatch: expected '${value}', but found '${enteredValue}'`);
            }

        } catch (error) {
            console.error(`Failed to fill input '${identifier}': ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }    
    
    // Wait until the button appears, then click, then verify expectation
    async clickAndVerify(clickIdentifier, verifyIdentifier, actionName, type = "xpath", timeout = 50000) {
        try {
            await this.page.waitForTimeout(1000);
            const clickLocator = this.getLocator(clickIdentifier, type); 
            if (!(await clickLocator.isVisible())) {
                throw new Error(`'${actionName}' button is not visible, cannot click.`);
            }
            await clickLocator.waitFor({ state: 'visible', timeout });
            if (!(await clickLocator.isEnabled())) {
                throw new Error(`'${actionName}' button is disabled, cannot click.`);
            }
            await clickLocator.click();
            const verifyLocator = this.getLocator(verifyIdentifier, type);
            await verifyLocator.waitFor({ state: 'visible', timeout });
            if (!(await verifyLocator.isVisible())) {
                throw new Error(`'${actionName}' verification failed. Expected element not found.`);
            }    
            // console.log(`'${actionName}' action verified successfully!`);

        } catch (error) {
            console.error(`'${actionName}' Click And Verify failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    

    // If the element appears, click it; otherwise, ignore it
    async clickIfVisible(selector, name, timeout = 50000) {
        try {
            await this.page.waitForTimeout(1000);
            const element = this.page.locator(selector);
            const isVisible = await element.waitFor({ state: "visible", timeout }).then(() => true).catch(() => false);
            if (isVisible) {
                // console.log(`'${name}' is visible, clicking now...`);
                await element.click();
            } 

        } catch (error) {
            // console.error(` Error clicking '${name}': ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Verify if an element does not exist
    async verifyElementNotExist(identifier, name, type = "xpath", timeout = 50000) {
        try {
            await this.page.waitForTimeout(1000);
            if (!identifier) throw new Error("Missing identifier for element locator");
    
            const locator = this.getLocator(identifier, type);
            
            if (await locator.count() === 0) {
                console.log(`'${name}' does not exist as expected.`);
                return true;
            }

            await locator.waitFor({ state: 'detached', timeout });
    
            if (await locator.count() > 0) {
                throw new Error(`'${name}' should have been removed, but it still exists.`);
            }
            // console.log(`'${name}' has been removed successfully.`);
            return true;
    
        } catch (error) {
            console.error(`'${name}' verification should not exist failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    

    // Verify if an element does not exist
    async verifyElementNotExist_Backup(identifier, name, type = "xpath", timeout = 50000) {
        try {
            await this.page.waitForTimeout(1000);
            if (!identifier) throw new Error("Missing identifier for element locator");
            const locator = this.getLocator(identifier, type);
            if (await locator.isVisible()) {
                console.warn(`'${name}' is still visible, waiting for it to disappear...`);
                await locator.waitFor({ state: "detached", timeout });
            }
            // console.log(`'${name}' does not exist as expected.`);
            return true;

        } catch (error) {
            console.error(`'${name}' verification should not exist failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
      
    // Wait until the button appears, then verify expect
    async verifyElementEnabled(identifier, name, type = "xpath", roleType = "button", timeout = 50000) {
        try {
            if (!identifier) throw new Error(" Missing identifier for element locator");
            await this.page.waitForTimeout(1000); 
            const locator = this.getLocator(identifier, type, roleType);
            await locator.waitFor({ state: 'visible', timeout });
            if (!(await locator.isEnabled())) {
                throw new Error(`'${name}' is disabled, cannot verify.`);
            }
            // console.log(`'${name}' is visible.`);
            return true;

        } catch (error) {
            console.error(`'${name}' verification element failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Wait until the button appears, then verify expect
    async verifyElementDisabled(identifier, name, type = "xpath", roleType = "button", timeout = 50000) {
        try {
            if (!identifier) throw new Error(" Missing identifier for element locator");
            await this.page.waitForTimeout(1000); 
            const locator = this.getLocator(identifier, type, roleType);
            if (!(await locator.isVisible())) {
                throw new Error(`'${name}' is not visible, cannot verify disabled state.`);
            }
            await locator.waitFor({ state: 'visible', timeout });
            // console.log(`'${name}' is visible.`);
            return true;

        } catch (error) {
            console.error(`'${name}' verification element failed: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////                 BUTTON TO CLICK          //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Wait for a fixed timeout, then attempt to click the button
    async Add_WAIOZ_to_MetaMask() {
        await this.page.waitForTimeout(10000);
        try {
            await this.page.getByRole('button', { name: 'Add WAIOZ to MetaMask' }).click();
        } catch (error) {
            // console.error(` Error in Add_WAIOZ_to_MetaMask: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;  
        }
    }

    // Wait until the button appears, then click
    async Swap_Button() {
        try {
            await this.page.waitForSelector(swapconfig.DropdownCost_Element, { timeout: 30000 });
            await this.page.locator(swapconfig.DropdownCost_Element)
                .waitFor({ state: 'attached' })
                .then(() => this.page.locator(swapconfig.Swap_Button).click());
        } catch (error) {
            // console.error(` Swap button error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Wait until the button appears, then click
    async Connect_Wallet_Button() {
        try {
            await this.page.waitForSelector(swapconfig.Connect_Wallet_Button, { timeout: 50000 });
            await this.page.locator(swapconfig.Connect_Wallet_Button)
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator(swapconfig.Connect_Wallet_Button).click());
        } catch (error) {
            // console.error(` Connect wallet button error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false; 
        }
    }
    
    // Wait until the button appears, then click
    async Pools_Page() {
        await this.clickButton(positionconfig.Pool_Page, "Pools Page", "xpath");
    }
    
    // Wait until the button appears, then click
    async Swaps_Page() {
        await this.clickButton(swapconfig.Swap_Page, "Swaps Page", "xpath");
    }

    // Wait until the button appears, then click
    async Assets_Page() {
        await this.clickButton(assetsconfig.Assets_Page, "Assets Page", "xpath");
    }

    // Wait until the button appears, then click
    async Farm_Page() {
        await this.clickButton(farmconfig.Farm_Page, "Farm Page", "xpath");
    }

    // Wait until the button appears, then click
    async Explore_Page() {
        await this.clickButton(exploreconfig.Explore_Page, "Explore Page", "xpath");
    }

    // Wait until the button appears, then click
    async Explore_Tokens_Page() {
        await this.clickButton(exploreconfig.Explore_Tokens_Page, "Explore Tokens Page", "xpath");
    }

    // Wait until the button appears, then click
    async Explore_Pools_Page() {
        await this.clickButton(exploreconfig.Explore_Pools_Page, "Explore Pools Page", "xpath");
    }

    // Wait until the button appears, then click
    async New_Position_Button() {
        await this.clickButton(positionconfig.New_Position_Button, "New position", "xpath");
    }

    // Wait until the button appears, then click
    async Create_Incentive_Button() {
        await this.page.waitForTimeout(1000);
        await this.clickButton(farmconfig.Create_Incentive_Button, "Create Incentive", "xpath");
    }

    // Wait until the button appears, then click
    async Stake_Token_Button() {
        await this.clickButton(farmconfig.Stake_Token_Button, "Stake Token", "xpath");
    }

    // Wait until the button appears, then click
    async Approve_Button() {
        await this.clickButton(farmconfig.Approve_Button, "Approve", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Stake_Token_Button() {
        await this.clickButton(farmconfig.Confirm_Stake_Token_Button, "Confirm Stake Token", "xpath");
    }

    // Wait until the button appears, then click
    async Threedots_Icon() {
        await this.clickButton(farmconfig.Threedots_Icon, "Threedots", "xpath");
    }

    // Wait until the button appears, then click
    async Unstake_Button() {
        await this.clickButton(farmconfig.Unstake_Button, "Unstake", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Unstake_Button() {
        await this.clickButton(farmconfig.Confirm_Unstake_Button, "Confirm Unstake", "xpath");
    }

    // Wait until the button appears, then click
    async Collect_Fees_Button() {
        await this.clickButton(farmconfig.Collect_Fees_Button, "Collect Fees", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Collect_Fees_Button() {
        await this.clickButton(farmconfig.Confirm_Collect_Fees_Button, "Confirm Collect Fees", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Create_Incentive_Button() {
        await this.clickButton(farmconfig.Confirm_Create_Incentive_Button, "Confirm Create Incentive", "xpath");
    }

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_001_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDC_AIOZ_001_Element, "AIOZ/USDC On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_005_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDC_AIOZ_005_Element, "AIOZ/USDC On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_03_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDC_AIOZ_03_Element, "AIOZ/USDC On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_1_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDC_AIOZ_1_Element, "AIOZ/USDC On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_001_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDT_AIOZ_001_Element, "AIOZ/USDT On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_005_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDT_AIOZ_005_Element, "AIOZ/USDT On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_03_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDT_AIOZ_03_Element, "AIOZ/USDT On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_1_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_USDT_AIOZ_1_Element, "AIOZ/USDT On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_001_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_STRK_AIOZ_001_Element, "AIOZ/STRK On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_005_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_STRK_AIOZ_005_Element, "AIOZ/STRK On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_03_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_STRK_AIOZ_03_Element, "AIOZ/STRK On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_1_OnGoing_Element() {
        await this.clickButton(farmconfig.Ongoing_STRK_AIOZ_1_Element, "AIOZ/STRK On Going", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_001_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDC_AIOZ_001_Element, "AIOZ/USDC Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_005_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDC_AIOZ_005_Element, "AIOZ/USDC Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_03_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDC_AIOZ_03_Element, "AIOZ/USDC Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDC_1_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDC_AIOZ_1_Element, "AIOZ/USDC Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_001_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDT_AIOZ_001_Element, "AIOZ/USDT Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_005_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDT_AIOZ_005_Element, "AIOZ/USDT Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_03_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDT_AIOZ_03_Element, "AIOZ/USDT Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZUSDT_1_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_USDT_AIOZ_1_Element, "AIOZ/USDT Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_001_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_STRK_AIOZ_001_Element, "AIOZ/STRK Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_005_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_STRK_AIOZ_005_Element, "AIOZ/STRK Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_03_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_STRK_AIOZ_03_Element, "AIOZ/STRK Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Incentive_AIOZSTRK_1_NotStarted_Element() {
        await this.clickButton(farmconfig.NotStarted_STRK_AIOZ_1_Element, "AIOZ/STRK Not Started", "xpath");
    }  

    // Wait until the button appears, then click
    async Create_Incentive_Element() {
        await this.clickButton(farmconfig.Create_Incentive_Element, "Create Incentive", "xpath");
    }

    // Wait until the button appears, then click
    async Clear_All_Button() {
        await this.clickButton(positionconfig.Clear_All_Button, "Clear all", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Confirm_Swap_Button() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(swapconfig.Confirm_Swap_Button, "Confirm Swap", "testId");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Close_Confirmation_Submitted_Icon() {
        await this.clickButton(swapconfig.Close_Confirmation_Submitted_Icon, "Close Transaction Submitted by icon X", "testId");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Close_Transaction_Submitted_Button() {
        await this.clickButton(swapconfig.Close_Transaction_Submitted_Button, "Close Transaction Submitted by text close", "xpath");
    }

    // Wait until the button appears, then click
    async Close_Choose_Wallet_Button() {
        await this.clickButton(swapconfig.Close_Choose_Wallet_Button, "Close Choose Wallet", "xpath");
    }

    // Wait until the button appears, then click
    async Wrap_Button() {
        await this.clickButton(swapconfig.Wrap_Button, "Wrap", "xpath");
    }

    // Wait until the button appears, then click
    async Unwrap_Button() {
        await this.clickButton(swapconfig.Unwrap_Button, "Unwrap", "xpath");
    }

    // Wait until the button appears, then click
    async Rewards_Amount_InputText(amount) {
        await this.fillInputField(farmconfig.InputText_Rewards_Amount, amount, "xpath");
    }

    // Wait until the button appears, then click
    async Pool_Pair_InputText(amount) {
        await this.fillInputField(farmconfig.InputText_Pool_Pair, amount, "xpath");
    }

    // Wait until the button appears, then click
    async Refundee_Address_InputText(amount) {
        await this.fillInputField(farmconfig.InputText_Refundee_Address, amount, "xpath");
    }

    // Wait until the button appears, then click
    async Current_Price_Element() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(swapconfig.Current_Price_Element, "Unwrap", "xpath");
    }

    // Wait until the button appears, then click
    async Assets_Tokens_Element() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(assetsconfig.Assets_Tokens_Element, ".Assets Tokens", "xpath");
    }

    // Wait until the button appears, then click
    async Assets_Liquidity_Element() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(assetsconfig.Assets_Liquidity_Element, "Assets Liquidity", "xpath");
    }

    // Wait until the button appears, then click
    async Assets_Farms_Element() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(assetsconfig.Assets_Farms_Element, "Assets Farms", "xpath");
    }

    // Wait until the button appears, then click
    async Supply_Button() {
        await this.page.waitForTimeout(7000);
        await this.clickButton(positionconfig.Supply_Button, "Supply", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Supply_Button() {
        await this.clickButton(positionconfig.Confirm_Supply_Button, "Confirm Supply", "xpath");
    }

    // Wait until the button appears, then click
    async Remove_Liquidity_Button() {
        await this.clickButton(positionconfig.Remove_Liquidity_Button, "Remove Liquidity", "xpath");
    }

    // Wait until the button appears, then click
    async Increase_Liquidity_Button() {
        await this.clickButton(positionconfig.Increase_Liquidity_Button, "Increase Liquidity", "xpath");
    }

    // Wait until the button appears, then click
    async Remove_Button() {
        await this.clickButton(positionconfig.Remove_Button, "Remove", "xpath");
    }

    // Wait until the button appears, then click
    async Confirm_Remove_Button() {
        await this.clickButton(positionconfig.Confirm_Remove_Button, "Confirm Remove", "xpath");
    }

    // Wait until the button appears, then click
    async Approve_USDT_Button() {
        await this.clickButton(positionconfig.Approve_USDT_Button, "Approve USDT", "xpath");
    }

    // Wait until the button appears, then click
    async Collect_Liquidity_Button() {
        await this.clickButton(positionconfig.Collect_Liquidity_Button, "Collect Liquidity", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Token_Redemption_Button() {
        await this.clickButton(swapconfig.Token_Redemption_Button, "Token Redemption", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_USDT_OutRange_001_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_OutRange_001_Element, "AIOZ_USDT Out Of Range 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_USDT_OutRange_005_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_OutRange_005_Element, "AIOZ_USDT Out Of Range 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_OutRange_03_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_OutRange_03_Element, "AIOZ_USDT Out Of Range 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_OutRange_1_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_OutRange_1_Element, "AIOZ_USDT Out Of Range 1%", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_USDT_InRange_001_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_InRange_001_Element, "AIOZ_USDT In range 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_USDT_InRange_005_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_InRange_005_Element, "AIOZ_USDT In range 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_InRange_03_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_InRange_03_Element, "AIOZ_USDT In range 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_InRange_1_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_InRange_1_Element, "AIOZ_USDT In range 1%", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_USDT_Closed_001_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_Closed_001_Element, "AIOZ_USDT Closed 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_USDT_Closed_005_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_Closed_005_Element, "AIOZ_USDT Closed 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_Closed_03_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_Closed_03_Element, "AIOZ_USDT Closed 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDT_Closed_1_Element() {
        await this.clickButton(positionconfig.AIOZ_USDT_Closed_1_Element, "AIOZ_USDT Closed 1%", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_USDC_InRange_001_Element() {
        await this.clickButton(positionconfig.AIOZ_USDC_InRange_001_Element, "AIOZ_USDC In range 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_USDC_InRange_005_Element() {
        await this.clickButton(positionconfig.AIOZ_USDC_InRange_005_Element, "AIOZ_USDC In range 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDC_InRange_03_Element() {
        await this.clickButton(positionconfig.AIOZ_USDC_InRange_03_Element, "AIOZ_USDC In range 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_USDC_InRange_1_Element() {
        await this.clickButton(positionconfig.AIOZ_USDC_InRange_1_Element, "AIOZ_USDC In range 1%", "xpath");
    }

    // If it appears, click it; otherwise, ignore it 
    async Hide_Closed_Positions_Button() {
        await this.clickIfVisible(positionconfig.Hide_Closed_Positions_Button, "Hide Closed Positions", "xpath");
    }

    // If it appears, click it; otherwise, ignore it 
    async Collect_Button() {
        await this.clickButton(positionconfig.Collect_Button, "Collect", "xpath");
    }

    // If it appears, click it; otherwise, ignore it 
    async Full_Range_Element() {
        await this.clickButton(positionconfig.Full_Range_Element, "Full Range", "xpath");
    }

    // If it appears, click it; otherwise, ignore it
    async Show_Closed_Positions_Button() {
        await this.clickIfVisible(positionconfig.Show_Closed_Positions_Button, "Show Closed Positions", "xpath");
    }

        // Wait until the button appears, then click
    async AIOZ_STRK_OutRange_001_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_OutRange_001_Element, "AIOZ_STRK Out Of Range 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_STRK_OutRange_005_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_OutRange_005_Element, "AIOZ_STRK Out Of Range 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_OutRange_03_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_OutRange_03_Element, "AIOZ_STRK Out Of Range 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_OutRange_1_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_OutRange_1_Element, "AIOZ_STRK Out Of Range 1%", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_STRK_InRange_001_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_InRange_001_Element, "AIOZ_STRK In range 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_STRK_InRange_005_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_InRange_005_Element, "AIOZ_STRK In range 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_InRange_03_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_InRange_03_Element, "AIOZ_STRK In range 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_InRange_1_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_InRange_1_Element, "AIOZ_STRK In range 1%", "xpath");
    }

    // Wait until the button appears, then click
    async AIOZ_STRK_Closed_001_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_Closed_001_Element, "AIOZ_STRK Closed 0.01%", "xpath");
    }

	// Wait until the button appears, then click
    async AIOZ_STRK_Closed_005_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_Closed_005_Element, "AIOZ_STRK Closed 0.05%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_Closed_03_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_Closed_03_Element, "AIOZ_STRK Closed 0.3%", "xpath");
    }
	
    // Wait until the button appears, then click
    async AIOZ_STRK_Closed_1_Element() {
        await this.clickButton(positionconfig.AIOZ_STRK_Closed_1_Element, "AIOZ_STRK Closed 1%", "xpath");
    }
    
    // Wait for a fixed timeout, then attempt to click the button
    async Fee_Tier_001_Element() {
        await this.clickButton(positionconfig.Fee_Tier_001_Element, "Fee Tier 0.01%", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Fee_Tier_005_Element() {
        await this.clickButton(positionconfig.Fee_Tier_005_Element, "Fee Tier 0.05%", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Fee_Tier_03_Element() {
        await this.clickButton(positionconfig.Fee_Tier_03_Element, "Fee Tier 0.3%", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Fee_Tier_1_Element() {
        await this.clickButton(positionconfig.Fee_Tier_1_Element, "Fee Tier 1%", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Increment_Low_Element() {
        await this.page.waitForTimeout(1000);
        await this.clickButton(positionconfig.Increment_Low_Element, "Increment Price Low", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Increment_High_Element() {
        await this.page.waitForTimeout(1000);
        await this.clickButton(positionconfig.Increment_High_Element, "Increment Price High", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Decrement_Low_Element() {
        await this.page.waitForTimeout(1000);
        await this.clickButton(positionconfig.Decrement_Low_Element, "Decrement Price Low", "xpath");
    }

    // Wait for a fixed timeout, then attempt to click the button
    async Decrement_High_Element() {
        await this.page.waitForTimeout(1000);
        await this.clickButton(positionconfig.Decrement_High_Element, "Decrement Price High", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Collected_Fees_Element() {
        await this.page.waitForTimeout(3000);
        await this.clickButton(positionconfig.Collected_Fees_Element, "Collected fees", "xpath");
    }

    // Wait until the button appears, then click
    async Amount_Half_A() {
        await this.clickButton(swapconfig.Half_From_Button, "Amount Half A", "xpath");
    }

    // Wait until the button appears, then click
    async Amount_Half_B() {
        await this.clickButton(swapconfig.Half_To_Button, "Amount Half B", "xpath");
    }

    // Wait until the button appears, then click
    async Amount_Max_A() {
        await this.clickButton(swapconfig.Max_From_Button, "Amount Max A", "xpath");
    }

    // Wait until the button appears, then click
    async Amount_Max_B() {
        await this.clickButton(swapconfig.Max_To_Button, "Amount Max B", "xpath");
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////           EXPECT RESULT          ///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Wait until the button appears, then click, then verify expect
    async Verify_Account_MetaMask_Connected() {
        await this.clickAndVerify(
            swapconfig.Close_Choose_Wallet_Button, 
            swapconfig.Expected_Account_MetaMask_Connected,
            "MetaMask account verification"
        );
    }
    
    // Wait until the button appears, then click, then verify expect
    async Verify_Account_CoinBase_Connected() {
        await this.clickAndVerify(
            swapconfig.Close_Choose_Wallet_Button, 
            swapconfig.Expected_Account_CoinBase_Connected, 
            "Coinbase account verification"
        );
    }

    // Wait until the button appears, then verify expect
    async Verify_Insufficient_Liquidity_For_This_Trade() {
        try {
            await expect(this.page.locator('div').filter({ hasText: /^Insufficient liquidity for this trade\.$/ }).nth(1))
                .toBeVisible({ timeout: 30000 }); 
        } catch (error) {
            // console.error(` Insufficient liquidity error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Wait until the button appears, then verify expect
    async Verify_Account_MetaMask_Disconnected() {
        await this.verifyElementEnabled(swapconfig.Navbar_Connect_Wallet_Element, "MetaMask Disconnect", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Account_CoinBase_Disconnected() {
        await this.verifyElementEnabled(swapconfig.Navbar_Connect_Wallet_Element, "Coinbase Disconnect", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Remove_Liquidity() {
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.Removed_Liquidity_Element, "Remove Liquidity", "xpath");
    }

    // Verify if an element does not exist
    async Verify_AIOZ_USDT_InRange_001_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_InRange_001_Element, "AIOZ_USDT In Range 0.01%", "xpath");
    }

    // Verify if an element does not exist
    async Verify_AIOZ_USDT_InRange_005_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_InRange_005_Element, "AIOZ_USDT In Range 0.05%", "xpath");
    }

    // Verify if an element does not exist
    async Verify_AIOZ_USDT_InRange_03_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_InRange_03_Element, "AIOZ_USDT In Range 0.3%", "xpath");
    }

    // Verify if an element does not exist
    async Verify_AIOZ_USDT_InRange_1_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_InRange_1_Element, "AIOZ_USDT In Range 1%", "xpath");
    }
    
    // Verify if an element does not exist
    async Verify_AIOZ_USDT_OutRange_001_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_OutRange_001_Element, "AIOZ_USDT Out Range 0.01%", "xpath");
    }
    
    // Verify if an element does not exist
    async Verify_AIOZ_USDT_OutRange_005_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_OutRange_005_Element, "AIOZ_USDT Out Range 0.05%", "xpath");
    }
    
    // Verify if an element does not exist
    async Verify_AIOZ_USDT_OutRange_03_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_OutRange_03_Element, "AIOZ_USDT Out Range 0.3%", "xpath");
    }
    
    // Verify if an element does not exist
    async Verify_AIOZ_USDT_OutRange_1_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDT_OutRange_1_Element, "AIOZ_USDT Out Range 1%", "xpath");
    }

// Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_001_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDC_InRange_001_Element, "AIOZ_USDC In range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_005_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDC_InRange_005_Element, "AIOZ_USDC In range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_03_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDC_InRange_03_Element, "AIOZ_USDC In range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_1_Not_Exist() {
        await this.page.reload();
        await this.verifyElementNotExist(positionconfig.AIOZ_USDC_InRange_1_Element, "AIOZ_USDC In range 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Select_Wallet_To_Connect() {
        await this.verifyElementEnabled(swapconfig.Select_Wallet_To_Connect_Element, "Wallet Selection", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Price_Impact_Warning() {
        await this.verifyElementEnabled(swapconfig.Price_Impact_Warning_Element, "Price Impact Warning", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_No_Liquidity_Data() {
        await this.verifyElementEnabled(swapconfig.No_Liquidity_Data_Element, "No Liquidity Data", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_Closed_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_Closed_001_Element, "AIOZ_STRK Closed 0.01%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_Closed_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_Closed_005_Element, "AIOZ_STRK Closed 0.05%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_Closed_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_Closed_03_Element, "AIOZ_STRK Closed 0.3%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_Closed_1() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_Closed_1_Element, "AIOZ_STRK Closed 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_Closed_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_Closed_001_Element, "AIOZ_USDT Closed 0.01%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_Closed_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_Closed_005_Element, "AIOZ_USDT Closed 0.05%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_Closed_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_Closed_03_Element, "AIOZ_USDT Closed 0.3%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_Closed_1() {;
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_Closed_1_Element, "AIOZ_USDT Closed 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_OutRange_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_OutRange_001_Element, "AIOZ_STRK Out of range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_OutRange_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_OutRange_005_Element, "AIOZ_STRK Out of range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_OutRange_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_OutRange_03_Element, "AIOZ_STRK Out of range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_STRK_OutRange_1() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_OutRange_1_Element, "AIOZ_STRK Out of range 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_OutRange_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_OutRange_001_Element, "AIOZ_USDT Out of range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_OutRange_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_OutRange_005_Element, "AIOZ_USDT Out of range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_OutRange_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_OutRange_03_Element, "AIOZ_USDT Out of range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_OutRange_1() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_OutRange_1_Element, "AIOZ_USDT Out of range 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_InRange_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_InRange_001_Element, "AIOZ_USDT In range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_InRange_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_InRange_005_Element, "AIOZ_USDT In range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_InRange_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_InRange_03_Element, "AIOZ_USDT In range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_AIOZ_USDT_InRange_1() {
        await this.verifyElementEnabled(positionconfig.AIOZ_USDT_InRange_1_Element, "AIOZ_USDT In range 1%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_STRK_InRange_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_InRange_001_Element, "AIOZ_STRK In range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_STRK_InRange_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_InRange_005_Element, "AIOZ_STRK In range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_STRK_InRange_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_InRange_03_Element, "AIOZ_STRK In range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_STRK_InRange_1() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_STRK_InRange_1_Element, "AIOZ_STRK In range 1%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_001() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDC_InRange_001_Element, "AIOZ_USDC In range 0.01%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_005() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDC_InRange_005_Element, "AIOZ_USDC In range 0.05%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_03() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDC_InRange_03_Element, "AIOZ_USDC In range 0.3%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_InRange_1() {
        await this.page.reload();
        await this.verifyElementEnabled(positionconfig.AIOZ_USDC_InRange_1_Element, "AIOZ_USDC In range 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Insufficient_AIOZ_Balance() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Insufficient_AIOZ_Balance_Element, "Insufficient AIOZ balance", "xpath");
    }
    
    // Wait until the button appears, then verify expect
    async Verify_Insufficient_USDT_Balance() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Insufficient_USDT_Balance_Element, "Insufficient USDT balance", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Insufficient_USDC_Balance() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Insufficient_USDC_Balance_Element, "Insufficient USDC balance", "xpath");
    }
    
    // Wait until the button appears, then verify expect
    async Verify_Insufficient_ETH_Balance() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Insufficient_ETH_Balance_Element, "Insufficient ETH balance", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_001() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementEnabled(assetsconfig.AIOZ_USDC_InRange_001_Element, "AIOZ/USDC 0.01%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_005() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementEnabled(assetsconfig.AIOZ_USDC_InRange_005_Element, "AIOZ/USDC 0.05%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_03() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementEnabled(assetsconfig.AIOZ_USDC_InRange_03_Element, "AIOZ/USDC 0.3%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_1() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementEnabled(assetsconfig.AIOZ_USDC_InRange_1_Element, "AIOZ/USDC 1%", "xpath");
    }

 // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_001_Not_Exist() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementNotExist(assetsconfig.AIOZ_USDC_InRange_001_Element, "AIOZ/USDC 0.01%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_005_Not_Exist() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementNotExist(assetsconfig.AIOZ_USDC_InRange_005_Element, "AIOZ/USDC 0.05%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_03_Not_Exist() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementNotExist(assetsconfig.AIOZ_USDC_InRange_03_Element, "AIOZ/USDC 0.3%", "xpath");
    }

    // Wait until the button appears, then verify
    async Verify_AIOZ_USDC_Assets_1_Not_Exist() {
        await this.page.waitForTimeout(5000);
        await this.verifyElementNotExist(assetsconfig.AIOZ_USDC_InRange_1_Element, "AIOZ/USDC 1%", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Appear_Here() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Appear_Here_Element, "Appear Here", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Not_Initialized() {
        await this.page.waitForTimeout(2000);
        await this.verifyElementDisabled(swapconfig.Not_Initialized_Element, "Not Initialized", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Enter_An_Amount() {
        await this.verifyElementDisabled(swapconfig.Enter_An_Amount_Element, "Enter an amount", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Transaction_Pending(Pending) {
        await this.verifyElementEnabled(Pending, "Pending", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Transaction_Pending_NotExist(Pending) {
        await this.verifyElementNotExist(Pending, "Pending", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_NotStarted(Pools) {
        await this.page.reload();
        await this.verifyElementEnabled(Pools, "Not Started", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_OnGoing(Pools) {
        await this.page.reload();
        await this.verifyElementEnabled(Pools, "On Going", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_Ended(Pools) {
        await this.page.reload();
        await this.verifyElementEnabled(Pools, "Ended", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_NotStarted_NotExist(Pools) {
        await this.page.reload();
        await this.verifyElementNotExist(Pools, "Not Started", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_OnGoing_NotExist(Pools) {
        await this.page.reload();
        await this.verifyElementNotExist(Pools, "On Going", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Incentive_Ended_NotExist(Pools) {
        await this.page.reload();
        await this.verifyElementNotExist(Pools, "Ended", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Unclaimed_Fees() {
        await this.page.waitForTimeout(3000);
        await this.verifyElementEnabled(positionconfig.Unclaimed_Fees_Element, "Unclaimed fees", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_Collected_Fees() {
        await this.page.waitForTimeout(3000);
        await this.verifyElementEnabled(positionconfig.Collected_Fees_Element, "Collected fees", "xpath");
    }

    // Verify if an element does not exist
    async Verify_Collected_Fees_Not_Exist() {
        await this.page.waitForTimeout(3000);
        await this.verifyElementNotExist(positionconfig.Collected_Fees_Element, "Collected fees", "xpath");
    }

    // Wait until the button appears, then verify expect
    async Verify_UNKNOWN_Token() {
        await this.verifyElementEnabled(swapconfig.UNKNOWN_Element, "Unknown token", "xpath");
    }
    
    // Wait until the button appears, then verify expect
    async Verify_No_Results_Found() {
        await this.verifyElementEnabled(swapconfig.No_Results_Found_Element, "No results found", "xpath");
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////                 STEP BY STEP             ///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Wait until the button appears, then click
    async Connect_Wallet_MetaMask() {
        try {
            await this.page.waitForTimeout(5000);
            await this.page.reload();
            await this.page.locator(swapconfig.Navbar_Connect_Wallet_Element).click({ timeout: 30000 });
            await this.page.locator(swapconfig.MetaMask_Wallet_Element).click({ timeout: 30000 });

        } catch (error) {
            // console.error(` MetaMask connection error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;  
        }
    }    

    // Wait until the button appears, then click
    async Connect_Wallet_CoinBase() {
        try {
            await this.page.waitForTimeout(5000);
            await this.page.reload();
            await this.page.locator(swapconfig.Navbar_Connect_Wallet_Element).click({ timeout: 30000 });
            await this.page.locator(swapconfig.Coinbase_Wallet_Element).click({ timeout: 30000 });
           
        } catch (error) {
            // console.error(` Coinbase connection error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }    

    // Wait until the button appears, then click
    async Switch_Network_To_Ethereum() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('Ethereum-selector').click({ timeout: 30000 });

        } catch (error) {
            // console.error(` Switch to Ethereum error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    
    // Wait until the button appears, then click
    async Switch_Network_To_AIOZ() {
        try {
            await this.page.getByTestId('chain-selector').click({ timeout: 30000 });
            await this.page.getByTestId('AIOZ Testnet-selector').click({ timeout: 30000 });

        } catch (error) {
            // console.error(` Switch to AIOZ error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }    
    
    // Wait until the button appears, then click
    async Disconnect_Wallet_MetaMask() {
        try {
            await this.page.locator(swapconfig.Connected_Element).click({ timeout: 30000 });
            await this.page.locator(swapconfig.Disconnected_Element).click({ timeout: 30000 });

        } catch (error) {
            // console.error(` MetaMask disconnect error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }    
    
    // Wait until the button appears, then click
    async Disconnect_Wallet_CoinBase() {
        try {
            await this.page.locator(swapconfig.Connected_Element).click({ timeout: 30000 });
            await this.page.locator(swapconfig.Disconnected_Element).click({ timeout: 30000 });

        } catch (error) {
            // console.error(` Coinbase disconnect error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false; 
        }
    }    

    // Fill in data and input text
    async Fill_Amount_A_on_Pool(amount) {
        try {
            await this.page.locator('#add-liquidity-input-tokena').getByPlaceholder('0').fill(amount);
            await this.page.waitForTimeout(2000);

        } catch (error) {
            // console.error(` Error in Fill Amount A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Fill in data and input text
    async Fill_Amount_B_on_Pool(amount) {
        try {
            await this.page.locator('#add-liquidity-input-tokenb').getByPlaceholder('0').fill(amount);
            await this.page.waitForTimeout(2000);
            
        } catch (error) {
            // console.error(` Error in Fill Amount B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;  
        }
    }

    // Fill in data and input text
    async Fill_Amount_A(amount) {
        try {
            await this.page.getByPlaceholder('0.0').first().fill(amount);
            await this.page.waitForTimeout(2000);
        } catch (error) {
            // console.error(` Error in Fill Amount A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false; 
        }
    }

    // Fill in data and input text
    async Fill_Amount_B(amount) {
        try {
            await this.page.getByPlaceholder('0.0').nth(1).fill(amount);
            await this.page.waitForTimeout(2000);
        } catch (error) {
            // console.error(` Error in Fill Amount B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Turn the network on and off the network
    async Off_Network() {
        try {
            await this.page.route('**/*', route => route.abort());
        } catch (error) {
            // console.error(` Off network error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Turn the network on and off the network
    async On_Network() {
        try {
            await this.page.waitForTimeout(5000);
            await this.page.unroute('**/*'); 
            await this.page.waitForTimeout(5000);
        } catch (error) {
            // console.error(` On network error: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_AIOZ_A() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.AIOZ_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token AIOZ A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false; 
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_STRK_A() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.Starknet_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error selecting Starknet token in Pool A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_USDT_A() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.USDT_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token USDT A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_USDC_A() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.USDC_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token USDT A: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_AIOZ_B() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.AIOZ_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token AIOZ B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_STRK_B() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.Starknet_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error selecting Starknet token in Pool B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_USDT_B() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.USDT_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token USDT B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Pool_Select_Token_USDC_B() {
        try {
            await this.page.locator(swapconfig.Select_Token_Dropdown).click();
            await this.page.locator(swapconfig.USDC_Token_Element).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Pool Select Token USDT B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Select_Token_USDT_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(swapconfig.Select_USDT_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Select Token USDT B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Select_Token_STRK_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(swapconfig.Select_STRK_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Select Token STRK B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Select_Token_USDC_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(swapconfig.Select_USDC_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Select Token STRK B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    
    // If it appears, click it; otherwise, ignore it
    async Select_Token_WAIOZ_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(swapconfig.Select_WAIOZ_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Select Token WAIOZ B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // If it appears, click it; otherwise, ignore it
    async Select_Token_BTC_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByText(swapconfig.Select_BTC_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Select Token BTC B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Adress_Token_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_Token_Invalid);
            await this.page.getByTestId('token-search-input').press('Enter');
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Adress Token B Invalid: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_WAIOZ_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_WAIOZ_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(swapconfig.Select_WAIOZ_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token WAIOZ B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_UNI_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_UNI_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(swapconfig.Select_Verify_UNKNOWN_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token UNI B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_STRK_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_STRK_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(swapconfig.Select_STRK_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token STRK B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_USDT_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_USDT_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(swapconfig.Select_USDT_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token USDT B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_USDC_B() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_USDC_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.getByText(swapconfig.Select_USDC_Token).click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token USDC B: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_WAIOZ_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_WAIOZ_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token WAIOZ B Invalid: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_STRK_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_STRK_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token STRK B Invalid: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_USDT_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_USDT_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token USDT B Invalid: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Click, fill, press "Enter"
    async Search_Token_USDC_B_Invalid() {
        try {
            await this.page.getByRole('button', { name: 'Select token' }).click();
            await this.page.getByTestId('token-search-input').click();
            await this.page.getByTestId('token-search-input').fill(swapconfig.Address_USDC_Token);
            await this.page.getByTestId('token-search-input').press('Enter');
            await this.page.locator('div').filter({ hasText: /^Unknown Token$/ }).first().click();
            const understandButton = this.page.getByRole('button', { name: 'I understand' });
            if (await understandButton.isVisible()) {
                await understandButton.click();
            }
        } catch (error) {
            // console.error(` Error in Search Token USDC B Invalid: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_0Percent() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator(swapconfig.Auto_Slippage_Element).click();
            await this.page.locator(swapconfig.InputText_Slippage_Settings).fill("0");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 0Percent: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_50Percent() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator(swapconfig.Auto_Slippage_Element).click();
            await this.page.locator(swapconfig.InputText_Slippage_Settings).fill("50");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 50Percent: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_100Percent() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator("(//div[text()='Auto'])[1]").click();
            await this.page.locator(swapconfig.InputText_Slippage_Settings).fill("100");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 100Percent: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_0M() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator(positionconfig.Transaction_Deadline_Element).click();
            await this.page.locator(positionconfig.InputText_Deadline_Element).fill("0");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 0M: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_1M() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator(positionconfig.Transaction_Deadline_Element).click();
            await this.page.locator(positionconfig.InputText_Deadline_Element).fill("1");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 1M: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

    // Attempt to click on the button, catch error if it fails
    async Transaction_Deadline_100M() {
        try {
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
            await this.page.locator(positionconfig.Transaction_Deadline_Element).click();
            await this.page.locator(positionconfig.InputText_Deadline_Element).fill("100");
            await this.page.locator(positionconfig.Transaction_Settings_Element).click();
        } catch (error) {
            // console.error(` Error in Transaction Deadline 100M: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////                               FUNCTION                ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get xpath and wait for elements to appear, show value current on web
    async Price_Liquidity() {
        await this.page.waitForTimeout(5000);
        try {
            // Save the selectors of the elements that need to get the data into the variable
            const TokenA = positionconfig.InputText_Token_From;
            const TokenB = positionconfig.InputText_Token_To;
            const LowPrice = positionconfig.InputText_Token_Low_Price;
            const HighPrice = positionconfig.InputText_Token_High_Price;
            const Pcurrent = positionconfig.P_Current_Element;
            const ShareOfPool = positionconfig.ShareOfPool_Element;

            // Wait for all elements to appear on the interface with a 5-second timeout
            await this.page.waitForSelector(TokenA, { timeout: 5000 });
            await this.page.waitForSelector(TokenB, { timeout: 5000 });
            await this.page.waitForSelector(LowPrice, { timeout: 5000 });
            await this.page.waitForSelector(HighPrice, { timeout: 5000 });
            await this.page.waitForSelector(Pcurrent, { timeout: 5000 });
            await this.page.waitForSelector(ShareOfPool, { timeout: 5000 });

            // Get the value from the input cells. If it is not obtained, return "N/A" to avoid the error
            const pointsTokenA = await this.page.locator(TokenA).inputValue().catch(() => "N/A");
            const pointsTokenB = await this.page.locator(TokenB).inputValue().catch(() => "N/A");
            const pointsLowPrice = await this.page.locator(LowPrice).inputValue().catch(() => "N/A");
            const pointsHighPrice = await this.page.locator(HighPrice).inputValue().catch(() => "N/A");
            const pointsPcurrent = parseFloat(await this.page.locator(Pcurrent).textContent().catch(() => "0"));
            const pointsShareOfPool = await this.page.locator(ShareOfPool).textContent().catch(() => "N/A");

            // Save the data to the this variable. PriceLiquidity as an object
            this.PriceLiquidity = { 
                TokenA: pointsTokenA,
                TokenB: pointsTokenB,
                LowPrice: pointsLowPrice,
                HighPrice: pointsHighPrice,
                Pcurrent: pointsPcurrent,
                ShareOfPool: pointsShareOfPool
            };

            console.log("Price Liquidity Data:", JSON.stringify(this.PriceLiquidity, null, 2));

            // Returns the collected data
            return this.PriceLiquidity;

        } catch (error) {
            // console.error(' Error in Price Liquidity:', error.message);
            // return null;
            // throw new Error("Test Failed: " + error.message); 
            this.testStatus = false; 
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get xpath and wait for elements to appear, show value current on web
    async Price_Range(feeTierPercent) {
        await this.page.waitForTimeout(5000);
        try {
            const feeTier = feeTierPercent / 100;

            // Save the selectors of the elements that need to get the data into the variable
            const TokenA = positionconfig.InputText_Token_From;
            const LowPrice = positionconfig.InputText_Token_Low_Price;
            const HighPrice = positionconfig.InputText_Token_High_Price;
            const Pcurrent = positionconfig.P_Current_Element;
            const Price_perAIOZ = positionconfig.Price_perAIOZ_Element;
            const Price_AIOZper = positionconfig.Price_AIOZper_Element;

            // Wait for all elements to appear on the interface with a 5-second timeout
            await this.page.waitForSelector(TokenA, { timeout: 5000 });
            await this.page.waitForSelector(LowPrice, { timeout: 5000 });
            await this.page.waitForSelector(HighPrice, { timeout: 5000 });
            await this.page.waitForSelector(Pcurrent, { timeout: 5000 });
            await this.page.waitForSelector(Price_perAIOZ, { timeout: 5000 });
            await this.page.waitForSelector(Price_AIOZper, { timeout: 5000 });

            // Get the value from the input cells. If it is not obtained, return "N/A" to avoid the error
            const pointsTokenA = parseFloat(await this.page.locator(TokenA).inputValue().catch(() => "0"));
            const pointsLowPrice = parseFloat(await this.page.locator(LowPrice).inputValue().catch(() => "0"));
            const pointsHighPrice = parseFloat(await this.page.locator(HighPrice).inputValue().catch(() => "0"));
            const pointsPcurrent = parseFloat(await this.page.locator(Pcurrent).textContent().catch(() => "0"));
            const pointsPrice_perAIOZ = parseFloat(await this.page.locator(Price_perAIOZ).textContent().catch(() => "0"));
            const pointsPrice_AIOZper = parseFloat(await this.page.locator(Price_AIOZper).textContent().catch(() => "0"));


            // Check if Low Price ≤ Pcurrent ≤ High Price
            const isPriceRangeValid = pointsLowPrice <= pointsPcurrent && pointsPcurrent <= pointsHighPrice;
            if (!isPriceRangeValid) {
                console.error(" Price is not within the valid range!");
                throw new Error("Price is not within the valid range!");
            }

            // Save the data to the this variable. PriceLiquidity as an object
            this.PriceRange = { 
                TokenA: pointsTokenA,
                LowPrice: pointsLowPrice,
                HighPrice: pointsHighPrice,
                Pcurrent: pointsPcurrent,
                Price_perAIOZ: pointsPrice_perAIOZ,
                Price_AIOZper: pointsPrice_AIOZper,
                [`FeeTier(${feeTierPercent}%)`]: feeTier
            };
            
            console.log("Price Range Data:", JSON.stringify(this.PriceRange, null, 2));
            
            // Returns the collected data
            return this.PriceRange;

        } catch (error) {
            // console.error(' Error in Price Range:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get xpath and wait for elements to appear, show value current on web
    async ValueReward() {
        try {
            const unclaimedreward = "//p[span[text()='unclaimed reward']]/following-sibling::p[contains(text(), 'WAIOZ')]";
            const claimedreward = "//p[span[text()='claimed reward']]/following-sibling::p[contains(text(), 'WAIOZ')]";
    
            const UnclaimedRewardText = await this.page.locator(unclaimedreward).textContent().catch(() => "0");
            const ClaimedRewardText = await this.page.locator(claimedreward).textContent().catch(() => "0");
    
            const UnclaimedReward = parseFloat(UnclaimedRewardText.replace(/[^0-9.]/g, "")) || 0;
            const ClaimedReward = parseFloat(ClaimedRewardText.replace(/[^0-9.]/g, "")) || 0;
    
            this.Value = { 
               UnclaimedReward,
               ClaimedReward
            };
    
            console.log("Value Data:", JSON.stringify(this.Value, null, 2));
            return this.Value;
    
        } catch (error) {
            throw error;
        }
    }
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get XPath, wait for element, retrieve current value, and convert using convertToPoints
    async Total_Token_Before() {
        await this.page.waitForTimeout(5000);
        try {

            const balanceFromSelector = swapconfig.Total_BalanceSwap_From;
            const balanceToSelector = swapconfig.Total_BalanceSwap_To;

            await this.page.waitForSelector(balanceFromSelector, { timeout: 15000 });
            await this.page.waitForSelector(balanceToSelector, { timeout: 15000 });

            const rawTextA = await this.page.locator(balanceFromSelector).textContent();
            const rawTextB = await this.page.locator(balanceToSelector).textContent();

            if (!rawTextA || !rawTextB) throw new Error("Missing balance values.");

            const pointA = this.convertToPoints(rawTextA);
            const pointB = this.convertToPoints(rawTextB);

            this.totalTokenBefore = { 
                Point_A: pointA, 
                Point_B: pointB, 
                Total_Token_Before_A: rawTextA.trim(), 
                Total_Token_Before_B: rawTextB.trim() 
            };

            console.log("Total Token Before Data:", this.totalTokenBefore);

            return this.totalTokenBefore;
            
        } catch (error) {
            // console.error(' Error retrieving points:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get XPath, wait for element, retrieve current value, and convert using convertToPoints
    async Total_Token_After() {
        await this.page.waitForTimeout(5000);
        try {
            const balanceFromSelector = swapconfig.Total_BalanceSwap_From;
            const balanceToSelector = swapconfig.Total_BalanceSwap_To;

            await this.page.waitForSelector(balanceFromSelector, { timeout: 5000 });
            await this.page.waitForSelector(balanceToSelector, { timeout: 5000 });

            const rawTextA = await this.page.locator(balanceFromSelector).textContent();
            const rawTextB = await this.page.locator(balanceToSelector).textContent();

            if (!rawTextA || !rawTextB) throw new Error("Missing balance values.");

            const pointA = this.convertToPoints(rawTextA);
            const pointB = this.convertToPoints(rawTextB);

            this.totalTokenAfter = { 
                Point_A: pointA, 
                Point_B: pointB, 
                Total_Token_After_A: rawTextA.trim(), 
                Total_Token_After_B: rawTextB.trim() 
            };

            console.log("Total Token After Data:", this.totalTokenAfter);

            return this.totalTokenAfter;

        } catch (error) {
            // console.error(' Error retrieving points:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get XPath, wait for element, retrieve current value, and convert using convertToPoints
    async Swap_Page() {
        await this.page.waitForTimeout(10000);
        try {
            // Wait for essential elements to appear
            await this.page.waitForSelector(swapconfig.DropdownCost_Element, { timeout: 50000 });
            await this.page.waitForSelector(swapconfig.InputText_Token, { timeout: 20000 });
    
            // Locate input fields for token amounts
            const inputs = await this.page.locator(swapconfig.InputText_Token).all();
            if (inputs.length < 2) throw new Error("Not enough input fields for token amount.");
    
            const [inputFrom, inputTo] = inputs;
    
            // Get initial values before swap
            let [initialFromValue, initialToValue] = await Promise.all([
                inputFrom.getAttribute('value') || "",
                inputTo.getAttribute('value') || ""
            ]);
    
            let [Token_Before_Swap_A, Token_Before_Swap_B] = [initialFromValue, initialToValue];
    
            // Wait for token values to update
            for (let i = 0; i < 20; i++) {
                [Token_Before_Swap_A, Token_Before_Swap_B] = await Promise.all([
                    inputFrom.getAttribute('value'),
                    inputTo.getAttribute('value')
                ]);
    
                if (Token_Before_Swap_A !== initialFromValue && Token_Before_Swap_B !== initialToValue) break;
                await this.page.waitForTimeout(500);
            }
    
            // Get fiat values before swap
            const [Value_Before_Swap_A, Value_Before_Swap_B] = await Promise.all([
                inputFrom.getAttribute('value') || "",
                inputTo.getAttribute('value') || "",
            ]);
    
            let priceImpactValue = '';
            let slippageToleranceValue = '';
    
            try {
                // Retrieve price impact and slippage tolerance
                const priceImpactLocator = this.page.locator(swapconfig.DropdownCost_Element);
                await priceImpactLocator.waitFor({ state: 'visible', timeout: 20000 });
                await priceImpactLocator.click();
    
                const priceImpactElement = await this.page.locator(swapconfig.Price_Impact_on_Swap_Element).first();
                const slippageToleranceElement = await this.page.locator(swapconfig.Slippage_Tolerance_on_Swap_Element).first();
    
                priceImpactValue = await priceImpactElement.textContent();
                slippageToleranceValue = await slippageToleranceElement.textContent();
            } catch (error) {
                console.error(` Error retrieving Price Impact or Slippage Tolerance: ${error.message}`);
            }
    
            // Format values for consistency
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

            // console.log("Swap Page Data:", this.tokenSwapPage);

            return this.tokenSwapPage;

        } catch (error) {
            // console.error(` Error in Swap_Page: ${error.message}`);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get XPath, wait for element, retrieve current value, and convert using convertToPoints
    async Wrap_Page() {
        try {
            // Wait for essential elements to appear
            await this.page.waitForSelector(swapconfig.InputText_Token, { timeout: 20000 });

            // Locate input fields for token amounts
            const inputs = await this.page.locator(swapconfig.InputText_Token).all();
            if (inputs.length < 2) throw new Error("Not enough input fields for token amount.");

            const [inputFrom, inputTo] = inputs;

            // Get initial values before wrap
            let [initialFromValue, initialToValue] = await Promise.all([
                inputFrom.getAttribute('value') ?? "",
                inputTo.getAttribute('value') ?? ""
            ]);

            let Token_Before_Swap_A = initialFromValue;
            let Token_Before_Swap_B = initialToValue;

            // Wait for token values to update
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

            // console.log("Wrap Page Data:", this.tokenWrapPage);

            return this.tokenWrapPage;

        } catch (error) {
            // console.error(` Error in Wrap Page: ${error.message}`);
            // return { Token_Before_Swap_A: "N/A", Token_Before_Swap_B: "N/A" };
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get XPath, wait for element, retrieve current value, and convert using convertToPoints
    async Confirm_Swap_Page() {
        try {
            await Promise.all([
                this.page.waitForSelector(swapconfig.InputText_Token_From_on_ConfirmSwap, { timeout: 10000 }),
                this.page.waitForSelector(swapconfig.InputText_Token_To_on_ConfirmSwap, { timeout: 10000 }),
                this.page.waitForSelector(swapconfig.Price_Impact_on_ConfirmSwap_Element, { timeout: 10000 }),
                this.page.waitForSelector(swapconfig.Slippage_Tolerance_on_ConfirmSwap_Element, { timeout: 10000 })
            ]);

            await this.page.waitForFunction(
                (selector) => document.querySelector(selector)?.textContent?.trim() !== "",
                swapconfig.InputText_Token_From_on_ConfirmSwap,
                { timeout: 5000 }
            );

            // await this.page.waitForFunction(
            //     () => document.querySelector(swapconfig.InputText_Token_From_on_ConfirmSwap)?.textContent?.trim() !== "",
            //     { timeout: 5000 }
            // );
    
            const inputPoint = await this.page.locator(swapconfig.InputText_Token_From_on_ConfirmSwap).textContent();
            const outputPoint = await this.page.locator(swapconfig.InputText_Token_To_on_ConfirmSwap).textContent();
            const Price_Impact = await this.page.locator(swapconfig.Price_Impact_on_ConfirmSwap_Element).textContent();
            const Slippage_Tolerance = await this.page.locator(swapconfig.Slippage_Tolerance_on_ConfirmSwap_Element).textContent();
    
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
            
            // console.log("Confirm Swap Page Data:", this.tokenConfirmSwapPage);
    
            return this.tokenConfirmSwapPage;
            
        } catch (error) {
            // console.error(' Error in Confirm_Swap_Page:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages
    async Compare_Swap_And_Confirm_Swap_Page() {
        try {
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
    
            this.compareSwapAndConfirmSwapPage = {
                matchTokensInput,
                matchTokensOutput,
                matchPriceImpact,
                matchSlippage
            };
    
            console.log("Compare Swap and Confirm Swap Page Data:", this.compareSwapAndConfirmSwapPage);
    
            return this.compareSwapAndConfirmSwapPage;

        } catch (error) {
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async Compare_Token_Before_And_After_Max_Swap(networkCostA) {
        try {
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
                    throw new Error(` ERROR! Invalid input for ${name}. Value: ${value}`);
                }
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
    
                return {
                    expected_Total_Token_After_A: Math.max(expected_Total_Token_After_A, 0),
                    expected_Total_Token_After_B: Math.max(expected_Total_Token_After_B, 0)
                };
            };
    
            const isWithinRange = (actual, expected, tolerance, fixedSlippage = 0.01) => {
                if (tolerance !== null && tolerance !== undefined) {
                    return Math.abs(actual - expected) <= tolerance;
                }
                return actual >= expected - fixedSlippage && actual <= expected + fixedSlippage;
            };
    
            const isValidForMaxSwap = (actual, maxTolerance = 0.01) => {
                return Math.abs(actual) <= maxTolerance;
            };
    
            const validateSuccessfulSwap = () => {
                const { expected_Total_Token_After_A, expected_Total_Token_After_B } = calculateExpectedValues();
    
                const Total_Token_After_A = Number(Actual_Total_Token_After_A);
                const Total_Token_After_B = Number(Actual_Total_Token_After_B);
    
                const passA =
                    expected_Total_Token_After_A === 0
                        ? isValidForMaxSwap(Total_Token_After_A, 0.1)
                        : isWithinRange(Total_Token_After_A, expected_Total_Token_After_A, networkCostA);
    
                const passB = isWithinRange(Total_Token_After_B, expected_Total_Token_After_B, null);
    
                if (passA && passB) {
                    console.log("Swap Successful!", {
                        Actual_Total_Token_After_A: Total_Token_After_A.toLocaleString(),
                        expected_Total_Token_After_A: expected_Total_Token_After_A.toLocaleString(),
                        Actual_Total_Token_After_B: Total_Token_After_B.toLocaleString(),
                        expected_Total_Token_After_B: expected_Total_Token_After_B.toLocaleString(),
                    });
                    return true;
                } else {
                    throw new Error(` ERROR! Swap validation failed.
                        Expected A: ${expected_Total_Token_After_A.toLocaleString()}, Actual A: ${Total_Token_After_A.toLocaleString()}
                        Expected B: ${expected_Total_Token_After_B.toLocaleString()}, Actual B: ${Total_Token_After_B.toLocaleString()}`);
                }
            };
    
            return validateSuccessfulSwap();

        } catch (error) {
            // console.error(" Test Failed: ", error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    async Current_Price_Is_Smaller_Than_Low_And_High() {
        try {
            const pointsPcurrent = parseFloat(this.PriceLiquidity?.Pcurrent || "0");

            // const lowPrice = pointsPcurrent + 1;
            // const highPrice = lowPrice + 1;
            // Fix sai số
            const lowPrice = parseFloat((pointsPcurrent + 0.00001).toFixed(7));
            const highPrice = parseFloat((lowPrice + 0.00001).toFixed(7));
            
            await this.page.locator(positionconfig.InputText_Token_Low_Price).fill(String(lowPrice));
            await this.page.locator(positionconfig.InputText_Token_High_Price).fill(String(highPrice));

            this.priceCache = { 
                pointsPcurrent, 
                lowPrice, 
                highPrice 
            };

            console.log("Price Data:", JSON.stringify(this.priceCache, null, 2));
            
            return this.priceCache;
            
        } catch (error) {
            // console.error(' Error handling condition:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async Current_Price_Is_Greater_Than_Low_And_High() {
        try {
            const pointsPcurrent = parseFloat(this.PriceLiquidity?.Pcurrent || "0");
            const highPrice = parseFloat((pointsPcurrent - 0.00001).toFixed(7));
            const lowPrice = parseFloat((highPrice - 0.00001).toFixed(7));

            // if (lowPrice < 0) {
            //     lowPrice = 0;
            //     highPrice = 1; 
            // }

            await this.page.locator(positionconfig.InputText_Token_High_Price).fill(String(highPrice));
            await this.page.locator(positionconfig.InputText_Token_Low_Price).fill(String(lowPrice));

            this.priceCache = { 
                pointsPcurrent, 
                highPrice,
                lowPrice
            };
            
            console.log("Price Data:", JSON.stringify(this.priceCache, null, 2));

            return this.priceCache;

        } catch (error) {
            // console.error(' Error handling condition:', error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async Compare_Token_Before_And_After_Valid_Swap(networkCostA) {
        try {
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
                    throw new Error(` ERROR! Invalid input for ${name}. Value: ${value}`);
                }
                return true;
            };
    
            const calculateExpectedValues = () => {
                try {
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
                        throw new Error(` ERROR! Expected Token A after swap is negative. Expected: ${expected_Total_Token_After_A}`);
                    }
                    if (expected_Total_Token_After_B < 0) {
                        throw new Error(` ERROR! Expected Token B after swap is negative. Expected: ${expected_Total_Token_After_B}`);
                    }
    
                    return { expected_Total_Token_After_A, expected_Total_Token_After_B };
                } catch (error) {
                    console.error(" ERROR in calculateExpectedValues:", error.message);
                    throw error;
                }
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
                try {
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
                        console.log("Swap Successful!", {
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
                            ` ERROR! Swap validation failed.\nExpected A: ${expected_Total_Token_After_A}, Actual A: ${Actual_Total_Token_After_A}\nExpected B: ${expected_Total_Token_After_B}, Actual B: ${Actual_Total_Token_After_B}`
                        );
                    }
                } catch (error) {
                    console.error(" ERROR in validateSuccessfulSwap:", error.message);
                }
            };
    
            return validateSuccessfulSwap();

        } catch (error) {
            // console.error(" ERROR in Compare_Token_Before_And_After_Valid_Swap:", error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async Compare_Token_Before_And_After_Valid_Position() {
        try {
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
                TokenA = "0",
                TokenB = "0"
            } = this.PriceLiquidity || {};
    
            const Token_After_A = this.convertToPoints(TokenA);
            const Token_After_B = this.convertToPoints(TokenB);
    
            // Check Validity
            const validateInput = (value, name) => {
                if (value === undefined || isNaN(value) || value < 0) {
                    throw new Error(` ERROR! Invalid input for ${name}. Value: ${value}`);
                }
            };
    
            [Actual_Total_Token_Before_A, Token_After_A, Actual_Total_Token_Before_B, Token_After_B].forEach(
                (val, index) => validateInput(val, `Parameter ${index + 1}`)
            );
    
            // Calculate the total after adding liquidity
            const expected_Total_Token_After_A = Actual_Total_Token_Before_A - Token_After_A;
            const expected_Total_Token_After_B = Actual_Total_Token_Before_B - Token_After_B;
    
            if (expected_Total_Token_After_A < 0 || expected_Total_Token_After_B < 0) {
                throw new Error(` ERROR! Insufficient liquidity. Token A: ${expected_Total_Token_After_A}, Token B: ${expected_Total_Token_After_B}`);
            }
    
            // Test function within error interval
            const isWithinTolerance = (actual, expected, tolerance = 0.0001) => {
                return Math.abs(actual - expected) <= tolerance;
            };
    
            const tolerance = 0.01; // Chấp nhận sai số 0.01
    
            const passA = isWithinTolerance(Number(Actual_Total_Token_After_A), Number(expected_Total_Token_After_A), tolerance);
            const passB = isWithinTolerance(Number(Actual_Total_Token_After_B), Number(expected_Total_Token_After_B), tolerance);
    
            if (passA && passB) {
                console.log("Add Liquidity Successful!", {
                    Before_A: Actual_Total_Token_Before_A,
                    Added_A: Token_After_A,
                    After_A: Actual_Total_Token_After_A,
                    Expected_A: expected_Total_Token_After_A,
    
                    Before_B: Actual_Total_Token_Before_B,
                    Added_B: Token_After_B,
                    After_B: Actual_Total_Token_After_B,
                    Expected_B: expected_Total_Token_After_B
                });
                return true;
            } else {
                throw new Error(
                    ` ERROR! Add Liquidity validation failed.\n` +
                    `Token A -> Before: ${Actual_Total_Token_Before_A}, Added: ${Token_After_A}, After: ${Actual_Total_Token_After_A}, Expected: ${expected_Total_Token_After_A}\n` +
                    `Token B -> Before: ${Actual_Total_Token_Before_B}, Added: ${Token_After_B}, After: ${Actual_Total_Token_After_B}, Expected: ${expected_Total_Token_After_B}`
                );
            }
        } catch (error) {
            // console.error(" Compare_Token_Before_And_After_Valid_Position failed:", error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async Compare_Token_Before_And_After_Invalid_Swap() {
        try {
            await this.page.waitForTimeout(10000);  
    
            if (!this.totalTokenBefore || !this.totalTokenAfter) {
                throw new Error(" ERROR! Missing token data before or after swap.");
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
                    throw new Error(" ERROR! One or more token values are invalid or not numeric.");
                }
    
                console.log("🔹 Token Balance Before Swap:  A =", before_A_Token, "| B =", before_B_Token);
                console.log("🔹 Token Balance After Swap:   A =", after_A_Token, "| B =", after_B_Token);
    
                if (after_A_Token === before_A_Token && after_B_Token === before_B_Token) {
                    console.log("Tokens remain unchanged!", {
                        before_A_Token,
                        before_B_Token,
                        after_A_Token,
                        after_B_Token
                    });
                    return true;
                } else {
                    console.error(` ERROR! Tokens changed despite swap rejection Before { A: ${before_A_Token}, B: ${before_B_Token} } | After { A: ${after_A_Token}, B: ${after_B_Token} }`);
                    return false;
                }
            };
    
            return invalidateRejectedSwap();

        } catch (error) {
            // console.error(" Compare_Token_Before_And_After_Invalid_Swap failed:", error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
        }
    }
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async Compare_Token_Before_And_After_Wrap() {
        try {
            await this.waitForTimeout(10000);
    
            if (!this.totalTokenBefore || !this.totalTokenAfter || !this.tokenWrapPage) {
                throw new Error(" ERROR! Missing token data before or after wrap.");
            }
    
            const { Point_A: beforeA = 0, Point_B: beforeB = 0 } = this.totalTokenBefore;
            const { Point_A: afterA = 0, Point_B: afterB = 0 } = this.totalTokenAfter;
            const { Token_Before_Swap_A: wrapA = "0", Token_Before_Swap_B: wrapB = "0" } = this.tokenWrapPage;
    
            const parseAndValidate = (value, name) => {
                const num = this.convertToPoints(value);
                if (isNaN(num) || num < 0) {
                    throw new Error(` ERROR! Invalid value for ${name}: ${value}`);
                }
                return parseFloat(num.toFixed(5));
            };
    
            const tokenAfterWrapA = parseAndValidate(wrapA, "Token_After_Wrap_A");
            const tokenAfterWrapB = parseAndValidate(wrapB, "Token_After_Wrap_B");
    
            const expectedAfterA = parseFloat((beforeA - tokenAfterWrapA).toFixed(5));
            const expectedAfterB = parseFloat((beforeB + tokenAfterWrapB).toFixed(5));
    
            if (expectedAfterA < 0) {
                throw new Error(" ERROR! Expected Token A after wrap is negative.");
            }
    
            const isMatchA = parseFloat(afterA) === expectedAfterA;
            const isMatchB = parseFloat(afterB) === expectedAfterB;
    
            if (isMatchA && isMatchB) {
                console.log("Wrap Successful!", {
                    Actual_Total_Token_After_A: afterA,
                    expected_Total_Token_After_A: expectedAfterA,
                    Actual_Total_Token_After_B: afterB,
                    expected_Total_Token_After_B: expectedAfterB
                });
                return true;
            } else {
                throw new Error(` ERROR! Wrap validation failed.\n` +
                    `Token A -> Before: ${beforeA}, Wrapped: ${tokenAfterWrapA}, After: ${afterA}, Expected: ${expectedAfterA}\n` +
                    `Token B -> Before: ${beforeB}, Wrapped: ${tokenAfterWrapB}, After: ${afterB}, Expected: ${expectedAfterB}`
                );
            }
        } catch (error) {
            // console.error(error.message);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
            // return false;
        }
    }
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Comparing 2 values on 2 pages 
    async getTokenAllWeb() {
        try {
            const topBalance_Element = swapconfig.topBalance_Element;
            const swapBalanceSelector = swapconfig.balanceSwap_Element;
    
            await Promise.all([
                this.page.waitForSelector(topBalance_Element, { timeout: 20000 }),
                this.page.waitForSelector(swapBalanceSelector, { timeout: 20000 }),
            ]);
    
            const [topBalance, swapBalance] = await Promise.all([
                this.page.locator(topBalance_Element).textContent(),
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
                    console.log(`🔹 AIOZ Top: ${top} | 🔹 AIOZ Swap: ${swap}`);
                } else {
                    console.warn(` 🔹 AIOZ Top: ${top} | 🔹 AIOZ Swap: ${swap}`);
                }
            };
    
            logBalance(trimmedTopBalance, trimmedSwapBalance);
    
            return { topBalance: trimmedTopBalance, swapBalance: trimmedSwapBalance };
    
        } catch (error) {
            // console.error(" Error retrieving AIOZ balance:", error);
            // throw new Error("Test Failed: " + error.message);  
            throw error; 
            // this.testStatus = false;
            // return { topBalance: null, swapBalance: null };
        }
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
