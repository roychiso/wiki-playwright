import { expect, Locator, Page } from '@playwright/test'
import { HistoryComponent } from '../pages/components/HistoryComponent' 

export class SearchPage {
    readonly page: Page;
    readonly historySection: HistoryComponent;
    readonly viewHistoryLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.historySection = new HistoryComponent(page);
        this.viewHistoryLink = page.locator('#ca-history');
    }

    async selectViewHistory() {
        await this.viewHistoryLink.waitFor();
        await this.viewHistoryLink.click();
    }
}