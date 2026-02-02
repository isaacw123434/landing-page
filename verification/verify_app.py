from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Wait for the main content to load
    page.wait_for_selector("text=Stop guessing how to get to work")

    # Screenshot landing page
    page.screenshot(path="verification/landing_page.png")

    # Click Calculate Route
    page.click("button:has-text('Calculate Route')")

    # Wait for modal
    page.wait_for_selector("text=Private Beta Access")

    # Screenshot modal
    page.screenshot(path="verification/modal.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
