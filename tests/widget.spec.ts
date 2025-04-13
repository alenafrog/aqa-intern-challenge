import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();
	  await expect(articles).toHaveCount(5);

    await articles.nth(1).click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });

  test('check articles sections fillness', async ({ page }) => {
    await widgetPage.openWidget();

    await widgetPage.clickButtoAllArticles();

    const sections = await widgetPage.getAllArticlesSections();
    await expect(sections).toHaveCount(3);

    for (const section of await sections.all()) {
      const sectionTitle = await widgetPage.findSectionTitle(section);
      //console.log(sectionTitle);
      expect(sectionTitle).toBeDefined();

      const categoryTitles = await widgetPage.findSectionCategoriesTitles(section);
      //console.log(await categoryTitles.count());
      expect(await categoryTitles.count()).toBeGreaterThan(0);
    }
  }); 

});
