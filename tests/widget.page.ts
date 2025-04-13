import {Locator, Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = 'span[class^=questions__] + [class^=btn]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
    BUTTON_ALL_ARTICLES = '[data-test=button_all_articles]',
    ALL_ARTICLES_SECTION = '[class^=section__]',
    ALL_ARTICLES_SECTION_TITLE = '[class^=section-title__]',
    ALL_ARTICLES_SECTION_CATEGORY_TITLE = '[class^=category__] div[class^=title__]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
    }
    
    async getAllArticlesSections() {
        return this.wrapper().locator(WidgetPage.selector.ALL_ARTICLES_SECTION);
    }


    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async clickButtoAllArticles() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_ALL_ARTICLES).click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    async findSectionTitle(section: Locator) {
        return section.locator(WidgetPage.selector.ALL_ARTICLES_SECTION_TITLE).textContent();
    }

    async findSectionCategoriesTitles(section: Locator) {
        return section.locator(WidgetPage.selector.ALL_ARTICLES_SECTION_CATEGORY_TITLE);
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }

}

