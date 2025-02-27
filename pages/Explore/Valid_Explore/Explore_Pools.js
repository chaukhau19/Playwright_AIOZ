import { exploreconfig } from "./../../../data/Explore_Config.js";
import { FunctionPage } from "../../../pages/Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

export class ValidExplorePoolsPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
}