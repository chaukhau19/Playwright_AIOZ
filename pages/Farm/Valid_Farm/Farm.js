import { farmconfig } from "./../../../data/Farm_Config.js";
import { FunctionPage } from "../../../pages/Functions.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

export class ValidFarmPage {
    constructor(page) {
        this.page = page;
        this.functionPage = new FunctionPage(page);
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
    }
}