import { expect, Locator, Page } from '@playwright/test'
import exp from 'constants';

export class HistoryComponent {
    readonly page: Page
    readonly latestEdit: Locator

    constructor(page: Page) {
        this.page = page
        this.latestEdit = page.locator('section#pagehistory ul:first-of-type');
    }

    async isLatestEditBy(name: string): Promise<boolean> {
        const element = await this.latestEdit.innerText();
        return element.includes(name);
    }


    async getLatestEditor(): Promise<string | null> {
        await this.latestEdit.waitFor();
        const latestEdit = await this.latestEdit.innerText();
        return latestEdit;
    }

}
