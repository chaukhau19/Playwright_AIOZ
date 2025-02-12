import { expect } from "@playwright/test";

export class ConnectWalletPage {
    constructor(page) {
        this.page = page;
    }

    
    async gotoURL() {
        await this.page.waitForTimeout(5000);
        await this.page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
    }

    async Connect_Wallet() {
        await this.page.reload();
        await this.page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
        await this.page.reload();
    }

    async Verify_Account_Connected() {
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
        await this.page.waitForTimeout(1000);
    }

    async Switch_Network_To_Ethereum() {
        await this.page.getByTestId('chain-selector').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('Ethereum-selector').click();
        await this.page.waitForTimeout(1000);
    }

    async Switch_Network_To_AIOZ() {
        await this.page.getByTestId('chain-selector').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('AIOZ Testnet-selector').click();
        await expect(this.page.getByTestId('AIOZ Testnet-selector')).toBeVisible();
        await this.page.waitForTimeout(1000);
    }

    async Disconnect_Wallet() {
        await this.page.locator("//button[@data-testid='web3-status-connected']").click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("//button[text()='Change wallet']").click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("//button[@data-testid='wallet-option-INJECTED']").click();
        await this.page.waitForTimeout(1000);
        await this.page.reload();
        await this.page.waitForTimeout(1000);
    }

    async Verify_Account_Disconnected() {
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
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
}
