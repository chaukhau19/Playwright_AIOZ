# dAppwright Examples

This is a test dApp that shows the different ways you can integrate [dAppwright](https://github.com/TenKeyLabs/dappwright) into your test suite.

You can find the different configurations in the [tests folder](https://github.com/TenKeyLabs/dappwright-examples/tree/main/tests).

## Installation

```bash
git clone https://github.com/TenKeyLabs/dappwright-examples.git
cd dappwright-examples
yarn install
```

Additionally, you need to install the required browsers for Playwright:

```bash
yarn playwright install
```

## Running the examples

You can run all of the examples with any of these commands:

```bash
yarn test:All
```

Or you can specify an example configuration with:

```bash
yarn test:ConnectMetaMask
yarn test:ConnectCoinBase  
yarn test:ConnectMetaMask && yarn test:ConnectCoinBase
```

## Running the dApp

In order to run the test dApp, it requires running both the application and local blockchain which requires two terminal sessions.

```bash
yarn dev # first terminal
yarn chain # second terminal
```

## Additional Information

```bash
C:\Worker KhauNTC\Github\Playwright_AIOZ\playwright-report
C:\Users\aioz\AppData\Local\Temp\dappwright
```
