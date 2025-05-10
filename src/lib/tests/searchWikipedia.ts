import { Page, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';

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
export async function run(page: Page, params: {}) {
    /** STEP 1. Navigate to Wikipedia */
    const baseURL = 'https://www.wikipedia.org/';
    const homePage: HomePage = new HomePage(page);
    await homePage.goto(baseURL);
    expect(page.url()).toBe(baseURL);

    /** STEP 2: Go to the "Artificial intelligence" page */
    await homePage.fillSearchCriteria('art');
    await homePage.selectArtifialIntelligenceLink();
    expect(page.url()).toContain('Artificial_intelligence');

    /** STEP 3: Click "View history" */
    const searchPage: SearchPage = new SearchPage(page);
    await searchPage.selectViewHistory();
    expect(page.url()).toContain('action=history');

    /** STEP 4: Assert that the latest edit was made by the user "Worstbull" */
    const isLatest = await searchPage.historySection.isLatestEditBy('Worstbull');
    console.log(`Checking if latest edit was by 'Worstbull':`, isLatest);
    expect(isLatest).toBeTruthy();
}
