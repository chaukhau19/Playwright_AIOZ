import { chromium } from 'playwright';

export class ConnectPage {
  constructor(page, wallet) {
    this.page = page;
    this.wallet = wallet;
  }

  async connectwallet() {
    try {
      // Launch the browser with MetaMask extension loaded
      const browser = await chromium.launch({
        headless: false,  // Set to false to see the MetaMask extension
      });

      // Create a new context to interact with MetaMask
      const context = await browser.newContext();
      const extensionPage = await context.newPage();

      // Go to MetaMask extension's home page
      await extensionPage.goto('chrome-extension://gadekpdjmpjjnnemgnhkbjgnjpdaakgh/home.html');
      console.log("MetaMask extension is opened");

      // Optionally, interact with the MetaMask extension (e.g., unlock wallet)
      // Example: await extensionPage.fill('input#password', 'your_password');
      // Example: await extensionPage.click('button#unlock');

      // Now that MetaMask is unlocked, go back to the main DApp
      const appPage = await context.newPage();
      await appPage.goto('https://aiozswap-web.vercel.app/#/swap');
      console.log("Navigated to the DApp");

      // Interact with the DApp page to connect the wallet
      await appPage.getByTestId('navbar-connect-wallet').click();
      await appPage.getByTestId('wallet-option-INJECTED').click();

      // You can also add any additional steps to handle notifications, like clicking the "connect" button in MetaMask
      const notificationPage = await context.newPage();
      await notificationPage.goto('chrome-extension://gadekpdjmpjjnnemgnhkbjgnjpdaakgh/notification.html');
      console.log("MetaMask notification page is opened");

      // Finally, close the context and browser after completion
      await notificationPage.close();
      await appPage.close();
      await extensionPage.close();
      await browser.close();
      
    } catch (error) {
      console.error("Error during the connect wallet process:", error);
    }
  }
}
