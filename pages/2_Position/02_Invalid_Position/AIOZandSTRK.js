import { positionconfig } from "../../../data/Position_Config.js";
import { farmconfig } from "../../../data/Farm_Config.js";
import { ConnectWalletMetaMaskPage } from "../../6_Dapps/02_MetaMask/MetaMask.js";
import { FunctionPage } from "../../Functions.js";

export class InvalidPositionPage {
    constructor(page) {
        this.page = page;
        this.connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
        this.functionPage = new FunctionPage(page);
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

