import { Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { AssertUtils } from '../tests/assertUtils';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Worstbull"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */



export async function run(page: Page, params: Record<string, unknown> = {}) {
    const baseURL = 'https://www.wikipedia.org/';
    const expectedEditor = 'Worstbull';

    // STEP 1: Navigate to Wikipedia
    const homePage = new HomePage(page);
    await homePage.goto(baseURL);
    AssertUtils.assertEqual(page.url(), baseURL, 'URL mismatch after navigating to homepage');

    // STEP 2: Go to the "Artificial intelligence" page
    await homePage.fillSearchCriteria('art');
    await homePage.selectArtifialIntelligenceLink();
    const aiUrl = page.url();
    if (!aiUrl.includes('Artificial_intelligence')) {
        throw new Error(`Expected URL to contain 'Artificial_intelligence', but got '${aiUrl}'`);
    }

    // STEP 3: Click "View history"
    const searchPage = new SearchPage(page);
    await searchPage.selectViewHistory();
    const historyUrl = page.url();
    if (!historyUrl.includes('action=history')) {
        throw new Error(`Expected URL to contain 'action=history', but got '${historyUrl}'`);
    }

    // STEP 4: Assert that the latest edit was made by the user "Worstbull"
    const latestEditor = await searchPage.historySection.getLatestEditor();
    if (!latestEditor) {
        throw new Error(`No latest editor found. Expected '${expectedEditor}' but got null/undefined.`);
    }

    AssertUtils.assertEqual(latestEditor, expectedEditor, 'Mismatch in latest editor');
}