import { assetsconfig } from "../../../data/Assets_Config.js";
import { FunctionPage } from "../../Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

export class InvalidAssetsPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
}