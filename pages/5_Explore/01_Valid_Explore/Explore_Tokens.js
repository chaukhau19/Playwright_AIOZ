import { exploreconfig } from "./../../../data/Explore_Config.js";
import { FunctionPage } from "../../../pages/Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

export class ValidExploreTokensPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
}