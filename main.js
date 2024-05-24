const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://reddit.com");

    // Accept cookies
    await page.click('button:has-text("Accept All")');

    // Search for "gaming"
    await page.fill('input[name="q"]', "gaming");
    await page.click('a[href="/r/gaming/"]');
    await page.waitForLoadState("networkidle");

    // Get and print the title of the first item
    const title = await page.$eval(
      'a[slot="full-post-link"]',
      (el) => el.textContent
    );
    console.log("Title:", title);

    // Log in
    await page.click("#login-button");
    await page.fill("#login-username", "AdEast6768");
    await page.fill("#login-password", "Password@1");
    await page.click('button.login:has-text("Log In")');
    await page.waitForLoadState("networkidle");

    // Downvote a post
    await page.click('button[aria-pressed="false"][downvote]');
    await page.waitForLoadState("networkidle");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
})();
