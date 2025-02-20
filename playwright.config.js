import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: 'tests', // Thư mục chứa test
  // fullyParallel: false, //để không ghi đè log.
  fullyParallel: true, // Chạy tất cả test song song để tăng tốc độ
  quiet: true, // Giảm log không cần thiết để terminal gọn gàng hơn
  forbidOnly: !!process.env.CI, // Ngăn chặn commit code có test `.only`, tránh lỗi khi push lên CI/CD
  retries: 0, // Không chạy lại test nếu bị fail
  workers: 1, // Chỉ chạy 1 worker
  reporter: [
    ['html', { outputFolder: './playwright-report', open: 'on', append: true, verbose: true }], // Giữ lại log của các lần chạy trước
    ['json', { outputFile: './playwright-report/report.json' }], // Lưu log dưới dạng file JSON
    ['junit', { outputFile: './playwright-report/output.xml' }], // Lưu log dưới dạng file XML
    ['list', { printSteps: true }], // Hiển thị danh sách test case
    ['line'], // Hiển thị log theo dòng
  ],

  timeout: 0, // Tắt timeout toàn cục, tránh test bị dừng giữa chừng
  
  attachments: {
    maxSize: '5mb', // Giới hạn kích thước file đính kèm trong báo cáo tối đa 5MB
  },

  use: {
    actionTimeout: 0, // Không giới hạn thời gian cho từng action (click, nhập liệu, v.v.)
    navigationTimeout: 0, // Không giới hạn thời gian tải trang
    headless: false, // Chạy trình duyệt có giao diện (nếu muốn chạy ẩn, đặt `true`)

    args: [
      "--disable-web-security", // Vô hiệu hóa bảo mật web, cho phép các request giữa các origin khác nhau
      "--disable-features=IsolateOrigins,site-per-process", // Vô hiệu hóa cách ly site để tránh lỗi bảo mật
      "--ignore-certificate-errors", // Bỏ qua lỗi chứng chỉ SSL
      "--disable-gpu", // Tắt GPU để tránh lỗi đồ họa khi chạy test
      "--disable-extensions", // Tắt các extension trên trình duyệt
      "--no-sandbox", // Vô hiệu hóa sandbox để tránh lỗi quyền trên môi trường CI
      "--disable-setuid-sandbox", // Tắt chế độ sandbox setuid
      '--proxy-server=https://aiozswap-web.vercel.app/', // Thiết lập proxy server để test trang web
    ],

    // video: 'only-on-failure',
    // trace: 'on-first-retry',
    // screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Ghi lại video chỉ khi test fail để tăng tốc độ chạy test
    trace: 'retain-on-failure', // Bật tracing chỉ khi test fail để debug
    screenshot: 'only-on-failure', // Chụp ảnh màn hình chỉ khi test fail để tăng tốc độ chạy test

    launchOptions: {
      slowMo: 0, // Không làm chậm các thao tác (có thể đặt 100-300ms nếu muốn thấy rõ thao tác trên UI)
    },

    viewport: { width: 1366, height: 768 }, // Thiết lập kích thước cửa sổ trình duyệt

  },

  projects: [
    {
      name: "chromium", // Chạy test trên trình duyệt Chrome
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
  ],
});

