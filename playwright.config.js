import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: 'tests', // Directory containing tests
  fullyParallel: false, // To not overwrite logs.
  // fullyParallel: true, // Run all tests in parallel to speed up execution
  quiet: true, // Reduce unnecessary logs to keep the terminal clean
  forbidOnly: !!process.env.CI, // Prevent committing code with `.only` tests, avoiding errors when pushing to CI/CD
  retries: 0, // Do not retry tests if they fail
  workers: 1, // Run only 1 worker
  reporter: [
    ['html', { outputFolder: './playwright-report', open: 'on', append: true, verbose: true }], // Keep logs from previous runs
    ['json', { outputFile: './playwright-report/report.json' }], // Save logs as JSON file
    ['junit', { outputFile: './playwright-report/output.xml' }], // Save logs as XML file
    ['list', { printSteps: true }], // Display list of test cases
    ['line'], // Display logs line by line
  ],

  timeout: 0, // Disable global timeout to avoid tests being stopped midway
  
  attachments: {
    maxSize: '5mb', // Limit the size of attachments in the report to a maximum of 5MB
  },

  use: {
    actionTimeout: 0, // No time limit for each action (click, input, etc.)
    navigationTimeout: 0, // No time limit for page navigation
    headless: true, // Run browser in headless mode (set to `false` to run with UI)

    args: [
      "--disable-web-security", // Disable web security to allow cross-origin requests
      "--disable-features=IsolateOrigins,site-per-process", // Disable site isolation to avoid security errors
      "--ignore-certificate-errors", // Ignore SSL certificate errors
      "--disable-gpu", // Disable GPU to avoid graphical errors during tests
      "--disable-extensions", // Disable browser extensions
      "--no-sandbox", // Disable sandbox to avoid permission errors in CI environments
      "--disable-setuid-sandbox", // Disable setuid sandbox mode
      '--proxy-server=https://aiozswap-web.vercel.app/', // Set proxy server to test the website
      "--disable-popup-blocking",
      "--disable-infobars",
      "--disable-backgrounding-occluded-windows",
      // "--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure",
    ],

    // video: 'only-on-failure',
    // trace: 'on-first-retry',
    // screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Record video only on test failure to speed up test execution
    trace: 'retain-on-failure', // Enable tracing only on test failure for debugging
    screenshot: 'only-on-failure', // Take screenshots only on test failure to speed up test execution

    launchOptions: {
      slowMo: 0, // Do not slow down actions (can set to 100-300ms to see UI actions clearly)
    },

    viewport: { width: 1366, height: 768 }, // Set browser window size

  },

  projects: [
    {
      name: "chromium", // Run tests on Chrome browser
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
  ],
});
