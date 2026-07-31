// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  //testMatch: '**/*.spec.js',
  retries: 1,
  fullyParallel: true,
  workers: 3,

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    // Visual comparison thresholds - tune these to control flakiness vs sensitivity
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,   // allow up to 2% pixel diff (font rendering/AA noise)
      animations: 'disabled',    // freeze CSS animations/transitions for stable snapshots
      caret: 'hide',
    },
  },

  reporter: [
    ['html'],
    ['allure-playwright']
  ],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'on-first-retry',
      }
    },
    //     {
    //   name: 'safari',
    //   use: {
    //     browserName: 'webkit',
    //     headless: false,
    //     screenshot: 'on',
    //     trace: 'on',
    //     video: 'on',
    //   }
    // },
    //         {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     headless: true,
    //     screenshot: 'off',
    //     trace: 'off',
    //     video: 'off',
    //     ignoreHTTPSErrors:true,
    //     permissions:['geolocation'],
    //     ...devices['Galaxy S24'],
    //     viewport:{width:720,height:720}
    //         }
    // },
  ],

  snapshotPathTemplate: 'visual-testing/{testFileName}/{arg}{ext}',

});
