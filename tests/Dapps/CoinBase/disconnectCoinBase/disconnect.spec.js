import { expect } from "@playwright/test";
import { test } from "./playwright.config.js";



test("Connect AIOZ with CoinBase", async ({ wallet, page }) => {
  await page.goto("https://aiozswap-web.vercel.app/#/swap");
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="wallet-option-COINBASE_WALLET"]').click();
  await wallet.approve();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0x0D3f...9E3b']]")).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator("//button[@data-testid='web3-status-connected']").click();
  await page.waitForTimeout(1000);
  await page.locator("//button[text()='Change wallet']").click();
  await page.waitForTimeout(1000);
  await page.locator("//button[@data-testid='wallet-option-COINBASE_WALLET']").click();
  await page.waitForTimeout(1000);
  await page.reload();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
  await page.waitForTimeout(1000);
});
