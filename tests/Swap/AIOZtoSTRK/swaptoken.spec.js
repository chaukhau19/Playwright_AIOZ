import { expect } from "@playwright/test";
import { FunctionPage } from "./helpers/function.js";
import { test } from "./helpers/walletTest.js";

test("Swap AIOZ to STRK", async ({ wallet, page }) => {
  const functionPage = new FunctionPage(page);

  await page.waitForTimeout(5000);

  await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });

  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByText('Starknet').click();
  await page.getByRole('button', { name: 'I understand' }).click();


/////////////////////////////////////////////////////////////
  await functionPage.Total_Token_Before();

  await page.getByPlaceholder('0.0').first().fill('1');
  await page.waitForTimeout(30000);

/////////////////////////////////////////////////////////////
  await functionPage.Token_Swap_Page();  

  await page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
    .waitFor({ state: 'attached' })
    .then(() => page.locator('[data-testid="swap-button"]').click());

/////////////////////////////////////////////////////////////
  await functionPage.Token_Confirm_Swap_Page();
  
  await functionPage.Compare_On_Swap_And_Confirm_Swap_Page();
/////////////////////////////////////////////////////////////

  await page.getByTestId('confirm-swap-button').click();
  await wallet.confirmTransaction(); 
  await page.waitForTimeout(5000)
  await page.getByTestId('confirmation-close-icon').click();
  await page.waitForTimeout(5000)
  await functionPage.Total_Token_After();
  await page.waitForTimeout(5000)

/////////////////////////////////////////////////////////////

  await functionPage.Compare_Token_Before_And_After_Swap();

});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









