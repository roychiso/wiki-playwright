import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly searchInputField: Locator;
    readonly artificialIntelligenceLink: Locator;
    readonly englishArticlesSection: Locator;
    readonly smallTextOption: Locator;
    readonly largeTextOption: Locator;
    readonly standardTextOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByRole('heading', { name: 'Welcome to Wikipedia' });
        this.searchInputField = page.getByRole('searchbox', {
            name: 'Search Wikipedia'
        });
        this.artificialIntelligenceLink = page.getByRole('link', { name: 'Artificial intelligence' });
        this.englishArticlesSection = page.locator('#articlecount >> li >> nth=1 >> a').first();
        this.smallTextOption = page.getByLabel('Small');
        this.largeTextOption = page.getByLabel('Large');
        this.standardTextOption = page.locator('#skin-client-pref-vector-feature-custom-font-size-value-1');
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async fillSearchCriteria(criteria: string) {
        await this.searchInputField.fill(criteria);
    }

    async selectArtifialIntelligenceLink() {
        await this.artificialIntelligenceLink.click();
    }

    async selectArticlesInEnglishLink() {
        await this.englishArticlesSection.click();
    }

    async selectSmallFontText() {
        await this.smallTextOption.click();
    }

    async selectLargeFontText() {
        await this.largeTextOption.click();
    }

    async selectStandardFontText() {
        await this.standardTextOption.click();
    }

    async getAmountOfArticles(): Promise<number> {
        const result = this.englishArticlesSection.first().innerText();
        const output = parseInt((await result).replace(/,/g, ''));

        return output;
    }

    async getTitleFontSize(): Promise<number> {
        const fontSize = await this.title.evaluate(el => {
            return parseFloat(window.getComputedStyle(el).fontSize);
        });
        return fontSize;
    }


}
