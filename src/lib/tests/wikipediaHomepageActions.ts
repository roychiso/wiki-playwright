import { Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AssertUtils } from '../tests/assertUtils';

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
export async function run(page: Page, params: Record<string, unknown> = {}) {
    const baseURL = 'https://en.wikipedia.org/wiki/Main_Page';
    const homePage = new HomePage(page);

    // STEP 1: Navigate to Wikipedia's homepage
    await homePage.goto(baseURL);
    AssertUtils.assertEqual(page.url(), baseURL, 'URL mismatch after navigating to Wikipedia homepage');

    // STEP 2: Assert there are less than 7,000,000 articles in English
    const articlesCount = await homePage.getAmountOfArticles();
    AssertUtils.assertLessThan(articlesCount, 7_000_000, 'Unexpected number of English Wikipedia articles');

    // STEP 3: Assert text gets smaller with "Small" font option
    const titleStandardSize = await homePage.getTitleFontSize();
    await homePage.selectSmallFontText();
    const titleSmallSize = await homePage.getTitleFontSize();
    AssertUtils.assertLessThan(titleSmallSize, titleStandardSize, 'Font size did not decrease with "Small" setting');

    // STEP 4: Select "Large" font option and validate
    await homePage.selectLargeFontText();
    const titleLargeSize = await homePage.getTitleFontSize();
    AssertUtils.assertGreaterThan(titleLargeSize, titleStandardSize, 'Font size did not increase with "Large" setting');

    // STEP 5: Return to "Standard" font option
    await homePage.selectStandardFontText();
    const titleStandardSizeAfter = await homePage.getTitleFontSize();
    AssertUtils.assertEqual(titleStandardSizeAfter, titleStandardSize, 'Font size did not return to standard after reset');
}