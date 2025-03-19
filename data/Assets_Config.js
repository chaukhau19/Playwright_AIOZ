
export const assetsconfig = {
    //DATA VALID
    InputValues_A: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1000", "10000"],
    InputValues_B: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1000", "10000"],
    FeeTier: ["0.01", "0.05", "0.3", "1"],

    //XPATH
    Assets_Page: "//a[contains(text(), 'Assets')]",
    Assets_Tokens_Element: "(//button[text()='Tokens'])[1]",
    Assets_Liquidity_Element: "(//button[text()='Liquidity'])[1]",
    Assets_Farms_Element: "(//button[text()='Farms'])[1]",

    AIOZ_USDC_InRange_001_Element: "//div[contains(text(), '0.01%')]/preceding-sibling::div[.//text()[contains(., 'USDC')] and .//text()[contains(., 'AIOZ')]]",
    AIOZ_USDC_InRange_005_Element: "//div[contains(text(), '0.05%')]/preceding-sibling::div[.//text()[contains(., 'USDC')] and .//text()[contains(., 'AIOZ')]]",
    AIOZ_USDC_InRange_03_Element: "//div[contains(text(), '0.3%')]/preceding-sibling::div[.//text()[contains(., 'USDC')] and .//text()[contains(., 'AIOZ')]]",
    AIOZ_USDC_InRange_1_Element: "//div[contains(text(), '1%')]/preceding-sibling::div[.//text()[contains(., 'USDC')] and .//text()[contains(., 'AIOZ')]]",


};
