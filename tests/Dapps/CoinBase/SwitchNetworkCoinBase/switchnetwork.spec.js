import { expect } from "@playwright/test";
import { test } from "./playwright.config.js";


test("Switch Network Ethereum to AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  await page.goto("https://aiozswap-web.vercel.app/#/swap");
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="wallet-option-COINBASE_WALLET"]').click();
  await wallet.approve();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0x0D3f...9E3b']]")).toBeVisible();
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('AIOZ Testnet-selector').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('Ethereum-selector').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('AIOZ Testnet-selector').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
});

