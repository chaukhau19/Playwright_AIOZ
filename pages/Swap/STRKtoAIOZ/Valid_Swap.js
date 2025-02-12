
export class ValidSwapPage {
    constructor(page) {
        this.page = page;
    }

    async Select_Token() {
        await this.page.getByRole('button', { name: 'Select token' }).click();
        await this.page.getByText('Starknet').click();
        await this.page.getByRole('button', { name: 'I understand' }).click();
    }

    async Token_Redemption() {
        await this.page.waitForTimeout(500);
        await this.page.locator("//div[@data-testid='swap-currency-button']").click();
        await this.page.waitForTimeout(500);
    }
    
    async Fill_Amount_A(amount) {
        await this.page.getByPlaceholder('0.0').first().fill(amount);
        await this.page.waitForTimeout(20000);
    }

    async Swap_Tokens() {
        await this.page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
            .waitFor({ state: 'attached' })
            .then(() => this.page.locator('[data-testid="swap-button"]').click());
    }


    async Add_to_MetaMask() {
        await this.page.waitForTimeout(10000);
        await this.page.getByRole('button', { name: 'Add WAIOZ to MetaMask' }).click();
    }

    async Close_Confirmation() {
        await this.page.waitForTimeout(2000);
        await this.page.getByTestId('confirmation-close-icon').click();
        await this.page.waitForTimeout(2000);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}