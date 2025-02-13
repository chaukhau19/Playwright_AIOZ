import { expect } from "@playwright/test";

export class ValidSwapPage {
    constructor(page) {
        this.page = page;
    }

    convertToPoints(text) {
        if (text.includes('.')) {
            return parseFloat(text.replace(/,/g, ""));
        } else if (text.includes(',')) {
            return parseFloat(text.replace(",", "."));
        } else {
            return parseFloat(text);
        }
    }
    async gotoURL() {
        await this.page.waitForTimeout(5000);
        await this.page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
    }

    async Connect_Wallet() {
        await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
    }

    async Verify_Account() {
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
        await this.page.waitForTimeout(1000);
    }

    async Select_Token() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText('Starknet').click();
        await this.page.getByRole('button', { name: 'I understand' }).click();
    }

    async Fill_Amount(amount) {
        await this.page.getByPlaceholder('0.0').first().fill(amount);
        await this.page.waitForTimeout(30000);
    }

    async Swap_Tokens() {
        await this.page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator('[data-testid="swap-button"]').click());
    }

    async Confirm_Swap() {
        await this.page.getByTestId('confirm-swap-button').click();
    }

    async Close_Confirmation() {
        await this.page.waitForTimeout(5000);
        await this.page.getByTestId('confirmation-close-icon').click();
        await this.page.waitForTimeout(5000);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}