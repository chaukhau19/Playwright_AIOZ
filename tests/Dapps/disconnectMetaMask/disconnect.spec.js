import { expect } from "@playwright/test";
import { test } from "./helpers/walletTest.js";


test("Disconnect AIOZ with MetaMask", async ({ wallet, page }) => {
  await page.goto("https://aiozswap-web.vercel.app/#/swap");
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
  await wallet.approve();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator("//button[@data-testid='web3-status-connected']").click();
  await page.waitForTimeout(1000);
  await page.locator("//button[text()='Change wallet']").click();
  await page.waitForTimeout(1000);
  await page.locator("//button[@data-testid='wallet-option-INJECTED']").click();
  await page.waitForTimeout(1000);
  await page.reload();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[@data-testid='navbar-connect-wallet']")).toBeVisible();
  await page.waitForTimeout(1000);
});
