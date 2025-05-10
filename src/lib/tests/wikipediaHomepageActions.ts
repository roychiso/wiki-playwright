import { Page, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP 1. Navigate to Wikipedia's homepage */
    const baseURL = 'https://en.wikipedia.org/wiki/Main_Page';
    const homePage: HomePage = new HomePage(page);
    await homePage.goto(baseURL);
    expect(page.url()).toBe(baseURL);
    /** STEP 2. Assert there are less than 7,000,000 articles in English*/
    const articlesCount = await homePage.getAmountOfArticles();
    expect(articlesCount).toBeLessThan(7000000);
    
    /** STEP 3. Assert the page's text gets smaller when the 'Small' text size option is selected */
    const titleStandardSize = await homePage.getTitleFontSize();
    await homePage.selectSmallFontText();
    const titleSmallSize = await homePage.getTitleFontSize();
    console.log(`Title font size before: ${titleStandardSize}, after: ${titleSmallSize}`);
    expect(titleSmallSize).toBeLessThan(titleStandardSize);
    
    /** STEP 4: Click the 'Large' text size option to change the display size */
    await homePage.selectLargeFontText();
    const titleLargeSize = await homePage.getTitleFontSize();
    expect(titleLargeSize).toBeGreaterThan(titleStandardSize);

    /** STEP 5: Click the 'Standard' text size option in the appearance settings */
    await homePage.selectStandardFontText();
    const titleStandardSizeAfter = await homePage.getTitleFontSize();
    expect (titleStandardSizeAfter).toBe(titleStandardSize);
}
