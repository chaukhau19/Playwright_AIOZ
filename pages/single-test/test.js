export class SinglePage {

  constructor(page, wallet) {
    this.page = page;
    this.wallet = wallet;
  }

  async connect() {
    console.log("🚀 Starting the connect process...");

    try {
      // Ensure element exists before clicking
      await this.page.waitForSelector("#connect-button");
      await this.page.click("#connect-button");
      console.log("Clicked on connect button");

      // If there's an approve method, perform it
      if (this.wallet && typeof this.wallet.approve === 'function') {
        await this.wallet.approve();
        console.log("Wallet approval complete");
      }

      // Check connection status
      const connectStatus = await this.page.getByTestId("connect-status");
      const statusText = await connectStatus.textContent();
      console.log("Connect Status:", statusText);
      expect(statusText).toBe("connected");

      // Switch network
      await this.page.click("#switch-network-button");
      console.log("Clicked on switch network");

      // Check network status
      const networkStatus = await this.page.getByTestId("network-status");
      const networkText = await networkStatus.textContent();
      console.log("Network Status:", networkText);
      expect(networkText).toBe("31337");


     

    } catch (error) {
      console.error("Error during the connect process:", error);
    }
  }
}


