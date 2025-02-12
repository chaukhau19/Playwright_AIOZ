import { expect } from "@playwright/test";

export class ValidSwapPage {
    constructor(page) {
        this.page = page;
    }


    async Select_Token() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText('Tether USD').click();
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


    async Close_Confirmation() {
        await this.page.waitForTimeout(5000);
        await this.page.getByTestId('confirmation-close-icon').click();
        await this.page.waitForTimeout(5000);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}