
export const swapconfig = {

  //DATA
  URL: "https://aiozswap-web.vercel.app/#/swap",
  Select_STRK_Token: 'Starknet',
  Select_USDT_Token: 'Tether USD',
  Select_WAIOZ_Token: 'Wrapped AIOZ',
  Select_AIOZ_Token: 'AIOZ',
  Select_USDC_Token: 'USDCoin',
  Select_BTC_Token: '0xBitcoin',
  Select_UNKNOWN_Token: 'Unknown Token',
  Address_WAIOZ_Token: '0x9CA90d6Fe5e747200B97f42348fADE923889738A',
  Address_STRK_Token: '0xEB00fDE9EA6818b18C8227Fa0C32d10cCAEe9ECa',
  Address_USDC_Token: '0x6d706649c05764013534EdDDbe9287Bf22a78f45',
  Address_USDT_Token: '0x8db0d130DaEA7a66F7279EF86f523E3C37258208',
  Address_UNI_Token: '0x5C69bEe701ef814a2B6a3EDD2B4cF31f441d46c4',
  Address_Token_Invalid: '0x8db0d1304013534EdDDb8fADE923889738A',

  //DATA VALID
  InputValues: ["0.000000001"],
  InputValue_A_1: "1",  
  InputValue_A_0: "0",
  InputValue_A_high: "12345678900000", 

  //DATA INVALID
  InputValue_A_Insufficient: "10000",

  //VERIFY
  Expected_Account_MetaMask_Connected: "//button[.//p[text()='0xd793...0e85']]",
  Expected_Account_CoinBase_Connected: "//button[.//p[text()='0x0D3f...9E3b']]",
};
