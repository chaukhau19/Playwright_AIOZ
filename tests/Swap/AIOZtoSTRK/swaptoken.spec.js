import { expect } from "@playwright/test";
import { FunctionPage } from "./helpers/function.js";
import { test } from "./helpers/walletTest.js";

test("Swap AIOZ to STRK", async ({ wallet, page }) => {
  const functionPage = new FunctionPage(page);

  await page.waitForTimeout(2000);
  // let maxRetries = 3;
  // for (let i = 0; i < maxRetries; i++) {
  //     try {
  //         await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
  //         console.log("✅ Page loaded successfully!");
  //         break;
  //     } catch (error) {
  //         console.error(`⚠️ The attempt ${i + 1} failed: ${error.message}`);
  //         if (i === maxRetries - 1) throw error; 
  //     }
  // }
  await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.goto("https://aiozswap-web.vercel.app/#/swap", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0xd793...0e85']]")).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByText('Starknet').click();
  await page.getByRole('button', { name: 'I understand' }).click();

  await functionPage.Total_Token_Before_Swap();

  await page.getByPlaceholder('0.0').first().fill('1');
  await page.waitForTimeout(30000);

  await functionPage.Token_Swap();  


  await page.locator("//div[@data-testid='swap-li-label' and contains(text(), 'Price impact')]")
    .waitFor({ state: 'attached' })
    .then(() => page.locator('[data-testid="swap-button"]').click());
  
  await functionPage.Token_ConfirmSwap();
  await functionPage.compareToken();
  
  // await page.getByTestId('confirm-swap-button').click();
  // await wallet.approve(); 
  // await page.getByTestId('pending-modal-content-title').click();


});





















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












// test("Save all browser session data for AIOZ connected with MetaMask", async ({ wallet, page }) => {
//   const dir = './cookies';
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   await page.goto("https://aiozswap-web.vercel.app/#/swap");

//   await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
//   await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();

//   await wallet.approve();
//   // Đợi ví MetaMask hoàn tất kết nối
//   await page.waitForTimeout(3000);

//   // Lưu cookies
//   const cookies = await page.context().cookies();
//   const cookiesPath = path.join(dir, 'cookies_uniswap_metamask.json');
//   fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));
  
//   const localStorageData = await page.evaluate(() => {
//     const data: { [key: string]: string } = {}; // Đảm bảo kiểu dữ liệu là một object
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key !== null) {
//         data[key] = localStorage.getItem(key) || ''; // Kiểm tra nếu giá trị null hoặc undefined thì trả về chuỗi rỗng
//       }
//     }
//     return data;
//   });
  
//   const sessionStorageData = await page.evaluate(() => {
//     const data: { [key: string]: string } = {};
//     for (let i = 0; i < sessionStorage.length; i++) {
//       const key = sessionStorage.key(i);
//       if (key !== null) {
//         data[key] = sessionStorage.getItem(key) || ''; // Kiểm tra nếu giá trị là null hoặc undefined
//       }
//     }
//     return data;
//   });
  

//   const sessionData = {
//     cookies: cookies,
//     localStorage: localStorageData,
//     sessionStorage: sessionStorageData
//   };

//   const sessionPath = path.join(dir, '/cookies_AIOZ_connected_MetaMask.json');
//   fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));

//   console.log('Session saved!');
// });
















// test("Save all browser session data for AIOZ connected with MetaMask", async ({ wallet, page }) => {
//   try {
//     // Tạo thư mục 'cookies' nếu chưa tồn tại
//     const dir = "./cookies";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // Truy cập trang và kết nối MetaMask
//     await page.goto("https://aiozswap-web.vercel.app/#/swap");
//     await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
//     await page.locator('//div[contains(@class, "Option__HeaderText") and text()="MetaMask"]').click();
//     await wallet.approve();
//     // Đợi ví MetaMask hoàn tất kết nối
//     await page.waitForTimeout(3000);

//     // Lưu cookies, localStorage, sessionStorage vào một đối tượng duy nhất
//     const cookies = await page.context().cookies();
//     const localStorageData = await page.evaluate(() => {
//       const data: Record<string, string> = {}; // Đảm bảo rằng dữ liệu là kiểu Record<string, string>
//       for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         if (key !== null) { // Kiểm tra key không phải là null
//           data[key] = localStorage.getItem(key) || ''; // Tránh null trong giá trị
//         }
//       }
//       return data;
//     });

//     const sessionStorageData = await page.evaluate(() => {
//       const data: Record<string, string> = {}; // Đảm bảo rằng dữ liệu là kiểu Record<string, string>
//       for (let i = 0; i < sessionStorage.length; i++) {
//         const key = sessionStorage.key(i);
//         if (key !== null) { // Kiểm tra key không phải là null
//           data[key] = sessionStorage.getItem(key) || ''; // Tránh null trong giá trị
//         }
//       }
//       return data;
//     });

//     // Tạo đối tượng chứa tất cả dữ liệu
//     const browserSessionData = {
//       cookies: cookies,
//       localStorage: localStorageData,
//       sessionStorage: sessionStorageData
//     };

//     // Lưu tất cả dữ liệu vào một file duy nhất
//     const filePath = dir + "/cookies_AIOZ_connected_MetaMask.json";
//     fs.writeFileSync(filePath, JSON.stringify(browserSessionData, null, 2));
//     console.log(`✅ All session data saved to ${filePath}`);

//   } catch (error) {
//     console.error("❌ Error saving browser session data:", error.message);
//   }
// });


















  // test("Open Cookie Browser", async ({ browser, page }) => {
  //   try {
  //     const cookiesFilePath = './cookies/cookies_connect_metamask.json';
  //     if (!fs.existsSync(cookiesFilePath)) {
  //       throw new Error(`Cookie file does not exist at path: ${cookiesFilePath}`);
  //     }
  //     const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));
  //     const context = await browser.newContext();
  //     await context.addCookies(cookies);
  //     const newPage = await context.newPage();
  //     await newPage.goto('https://aiozswap-web.vercel.app/#/swap');
  //     await page.waitForTimeout(3000);
  //     console.log("✅ Opened page with saved cookies successfully.");
  //   } catch (error) {
  //     console.error('❌ Failed to open with saved cookies:', error.message);
  //   }
  // });
  






// test("Connect Google with MetaMask and Save Cookie after Login Google", async ({ wallet, page }) => {
//   await page.goto('https://accounts.google.com/v3/signin/identifier?hl=vi-VN&ifkv=AVdkyDmgk_QqulKNwK3hirkx5FQ-Qd09sUg1dvAHHKpzS1kza52dmAlXjgK0q7mUUm_zCwh8qA6W&service=chromiumsync&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1172874211%3A1737014261263562&ddm=1');
//   await page.getByLabel('Email hoặc số điện thoại').fill('tester@playgroundvina.com');
//   await page.getByRole('button', { name: 'Tiếp theo' }).click();
//   await page.getByLabel('Nhập mật khẩu của bạn').fill('0410teamtest@#');
//   await page.getByRole('button', { name: 'Tiếp theo' }).click();
//   // await page.getByRole('link', { name: 'Nhập một trong các mã dự phòng 8 chữ số của bạn' }).click();
//   // await page.getByLabel('Nhập mã dự phòng').fill('5941 1605');
//   // await page.getByRole('button', { name: 'Tiếp theo' }).click();
//   await page.waitForTimeout(10000);
//   await expect(page.getByText('Chrome data in your account')).toBeVisible();

// });
