
export const positionconfig = {

  //DATA VALID
  InputValues_A: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1000", "10000"],
  InputValues_B: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1000", "10000"],
  FeeTier: ["0.01", "0.05", "0.3", "1"],

  //DATA INVALID

  //Xpath

  Increment_Low_Element: '(//button[@data-testid="increment-price-range"])[1]',
  Increment_High_Element: '(//button[@data-testid="increment-price-range"])[2]',
  Decrement_Low_Element: '(//button[@data-testid="decrement-price-range"])[1]',
  Decrement_High_Element: '(//button[@data-testid="decrement-price-range"])[2]',
  Fee_Tier_001_Element: "//button[.//div[contains(text(), '0.01%')]]",
  Fee_Tier_005_Element: "//button[.//div[contains(text(), '0.05%')]]",
  Fee_Tier_03_Element: "//button[.//div[contains(text(), '0.3%')]]",
  Fee_Tier_1_Element: "(//button[.//div[contains(text(), '1%')]])[2]",
  P_Current_Element: "//div[contains(text(),'Current price:')]/following-sibling::div/span",
  Price_perAIOZ_Element: "(//div[contains(text(),'Prices and pool share')]/following-sibling::div//div[contains(text(),'AIOZ per')]/preceding-sibling::div[1])[1]",
  Price_AIOZper_Element: "(//div[contains(text(),'Prices and pool share')]/following-sibling::div//div[contains(text(),'per AIOZ')]/preceding-sibling::div[1])[1]",
  ShareOfPool_Element: "//div[contains(text(),'Prices and pool share')]/following-sibling::div//div[contains(text(),'of')]/preceding-sibling::div[1]",
  AIOZ_USDT_OutRange_001_Element: "(//div[contains(., 'USDT') and contains(., '0.01%') and contains(., 'Out of range')])[6]",
  AIOZ_USDT_OutRange_005_Element: "(//div[contains(., 'USDT') and contains(., '0.05%') and contains(., 'Out of range')])[6]",
  AIOZ_USDT_OutRange_03_Element: "(//div[contains(., 'USDT') and contains(., '0.3%') and contains(., 'Out of range')])[6]",
  AIOZ_USDT_OutRange_1_Element: "(//div[contains(., 'USDT') and contains(., '1%') and contains(., 'Out of range')])[6]",
  AIOZ_USDT_InRange_001_Element: "(//div[contains(., 'USDT') and contains(., '0.01%') and contains(., 'In range')])[6]",
  AIOZ_USDT_InRange_005_Element: "(//div[contains(., 'USDT') and contains(., '0.05%') and contains(., 'In range')])[6]",
  AIOZ_USDT_InRange_03_Element: "(//div[contains(., 'USDT') and contains(., '0.3%') and contains(., 'In range')])[6]",
  AIOZ_USDT_InRange_1_Element: "(//div[contains(., 'USDT') and contains(., '1%') and contains(., 'In range')])[6]",
  AIOZ_USDT_Closed_001_Element: "(//div[contains(., 'USDT') and contains(., '0.01%') and contains(., 'Closed')])[6]",
  AIOZ_USDT_Closed_005_Element: "(//div[contains(., 'USDT') and contains(., '0.05%') and contains(., 'Closed')])[6]",
  AIOZ_USDT_Closed_03_Element: "(//div[contains(., 'USDT') and contains(., '0.3%') and contains(., 'Closed')])[6]",
  AIOZ_USDT_Closed_1_Element: "(//div[contains(., 'USDT') and contains(., '1%') and contains(., 'Closed')])[6]",
  AIOZ_STRK_OutRange_001_Element: "(//div[contains(., 'STRK') and contains(., '0.01%') and contains(., 'Out of range')])[6]",
  AIOZ_STRK_OutRange_005_Element: "(//div[contains(., 'STRK') and contains(., '0.05%') and contains(., 'Out of range')])[6]",
  AIOZ_STRK_OutRange_03_Element: "(//div[contains(., 'STRK') and contains(., '0.3%') and contains(., 'Out of range')])[6]",
  AIOZ_STRK_OutRange_1_Element: "(//div[contains(., 'STRK') and contains(., '1%') and contains(., 'Out of range')])[6]",
  AIOZ_STRK_InRange_001_Element: "(//div[contains(., 'STRK') and contains(., '0.01%') and contains(., 'In range')])[6]",
  AIOZ_STRK_InRange_005_Element: "(//div[contains(., 'STRK') and contains(., '0.05%') and contains(., 'In range')])[6]",
  AIOZ_STRK_InRange_03_Element: "(//div[contains(., 'STRK') and contains(., '0.3%') and contains(., 'In range')])[6]",
  AIOZ_STRK_InRange_1_Element: "(//div[contains(., 'STRK') and contains(., '1%') and contains(., 'In range')])[6]",
  AIOZ_USDC_InRange_001_Element: "(//div[contains(., 'USDC') and contains(., '0.01%') and contains(., 'In range')])[6]",
  AIOZ_USDC_InRange_005_Element: "(//div[contains(., 'USDC') and contains(., '0.05%') and contains(., 'In range')])[6]",
  AIOZ_USDC_InRange_03_Element: "(//div[contains(., 'USDC') and contains(., '0.3%') and contains(., 'In range')])[6]",
  AIOZ_USDC_InRange_1_Element: "(//div[contains(., 'USDC') and contains(., '1%') and contains(., 'In range')])[6]",
  AIOZ_STRK_Closed_001_Element: "(//div[contains(., 'STRK') and contains(., '0.01%') and contains(., 'Closed')])[6]",
  AIOZ_STRK_Closed_005_Element: "(//div[contains(., 'STRK') and contains(., '0.05%') and contains(., 'Closed')])[6]",
  AIOZ_STRK_Closed_03_Element: "(//div[contains(., 'STRK') and contains(., '0.3%') and contains(., 'Closed')])[6]",
  AIOZ_STRK_Closed_1_Element: "(//div[contains(., 'STRK') and contains(., '1%') and contains(., 'Closed')])[6]",
  Removed_Liquidity_Element: "//div[text()='Closed']",
  Transaction_Settings_Element: "//button[@aria-label='Transaction Settings']",
  Transaction_Deadline_Element: '//div[@data-testid="transaction-deadline-settings"]',
  InputText_Deadline_Element: '//input[@data-testid="deadline-input"]',
  Full_Range_Element: "//div[contains(text(),'Full range')]",
  Unclaimed_Fees_Element: "//div[contains(text(), 'Unclaimed fees')]/following-sibling::div[contains(text(), '$0.00')]",
  Collected_Fees_Element: "//div[contains(text(), 'Collect fees')]",

  InputText_Token_From: "(//input[@type='text' and @pattern='^[0-9]*[.,]?[0-9]*$'])[1]",
  InputText_Token_To: "(//input[@type='text' and @pattern='^[0-9]*[.,]?[0-9]*$'])[2]",
  InputText_Token_Low_Price: "(//input[@type='text' and @pattern='^[0-9]*[.,]?[0-9]*$'])[3]",
  InputText_Token_High_Price: "(//input[@type='text' and @pattern='^[0-9]*[.,]?[0-9]*$'])[4]",
  InputText_Amount_From: '#add-liquidity-input-tokena',
  InputText_Amount_To: '#add-liquidity-input-tokenb',

  Pool_Page: '//a[@data-testid="pool-nav-link" and contains(text(), "Pools")]',

  Collect_Button: "//button[contains(text(), 'Collect')]",
  Clear_All_Button: "//div[text()='Clear all']",
  Supply_Button: "//button[div[contains(text(), 'Supply')]]",
  Confirm_Supply_Button: "//div[button/div[text()='Confirm Supply']]",
  Remove_Liquidity_Button: "//a[contains(text(), 'Remove liquidity')]",
  Increase_Liquidity_Button: "//a[contains(text(), 'Increase liquidity')]",
  Remove_Button: "(//button[contains(text(), 'Remove')])[1]",
  Confirm_Remove_Button: "(//button[contains(text(), 'Remove')])[2]",
  Approve_USDT_Button: "//button[contains(text(), 'Approve USDT')]",
  Collect_Liquidity_Button: "//button[@id='receive-as-weth']",
  Hide_Closed_Positions_Button: "//button[@id='desktop-hide-closed-positions' and text()='Hide closed positions']",
  Show_Closed_Positions_Button: "//button[@id='desktop-hide-closed-positions' and text()='Show closed positions']",
  New_Position_Button: "//a[text()='New position']",

  //Expect
  Appear_Here: "Appear Here",
  No_Liquidity_Data: "No Liquidity Data",
  No_liquidity: "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.",
  Out_Of_Range: "Your position will not earn fees or be used in trades until the market price moves into your range.",
};
  