import { expect } from "@playwright/test";
import { test } from "./helpers/walletTest.js";

test("Swap AIOZ to USDT", async ({ wallet, page }) => {
  await page.waitForTimeout(2000);
  await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
  await page.waitForTimeout(1000);
 


});
