import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './TEST',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'junit',
  outputDir: './playwright-report',
  use: {
    baseURL: 'https://to-scooby-do-b1b9c.web.app',
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 

// test 1